'use strict'

const BorrowerProfile = use('App/Models/BorrowerProfile')
const LoanDetail = use('App/Models/LoanDetail')
const Database = use('Database')

class FileController {
    async uploadCsv({request, response}) {
        response.implicitEnd = false

        const csvObjects = []
        const parse = require('csv-parser')
        const parser = parse({
            delimiter: ','
        })

        request.multipart.file(
            'file',
            {
                size: '10mb',
                extnames: ['csv']
            },
            (file) => {
                file.stream.pipe(parser)
            }
        )
        .process()

        parser.on('readable', async function() {
            let record
            while (record = parser.read()) {
                csvObjects.push(record)
            }
        })

        parser.on('end', async function() {
            const trx = await Database.beginTransaction()
            try {
                for (const csvObject of csvObjects) {
                    const borrower = BorrowerProfile.transformJsonToObject(csvObject)
                    await borrower.save(trx)

                    const loan = LoanDetail.transformJsonToObject(csvObject)
                    loan.loan_status = 'pending'
                    await loan.save(trx)
                    await loan.borrower().associate(borrower, trx)
                }

                trx.commit()
                response.status(200).send({
                    meta: {
                        message: 'OK'
                    }
                })
            }
            catch(err) {
                trx.rollback()
                if (err.code === 400)
                    response.status(err.code).send({
                        meta: {
                            message: err.message
                        }
                    })
                
                response.status(500).send({
                    meta: {
                        message: err.message
                    }
                })
            }
        })
    }
}

module.exports = FileController

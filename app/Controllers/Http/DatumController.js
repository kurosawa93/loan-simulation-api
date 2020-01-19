'use strict'

const BorrowerProfile = use('App/Models/BorrowerProfile')

class DatumController {
    async getData({request, response}) {
        try {
            const data = await BorrowerProfile.getBorrowerData(request.input('status'))
            response.status(200).send({
                data: data,
                meta: {
                    message: 'OK'
                }
            })
        }
        catch(err) {
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
    }
}

module.exports = DatumController

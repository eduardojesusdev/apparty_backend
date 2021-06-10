'use strict'

const Helpers = use('Helpers')
const fs = use('fs')
const bytes = use('bytes')
const Party = use('App/Models/Party')
const User = use('App/models/User')
const Cloudinary = use('App/Services/Cloudinary')


class FileController {

  async upload ({ request, response, auth }) {

    try{
      const banner = request.file('banner', {
        types: ['image'],
        size: '5mb'
      })

      const party_slug = request.params.party_slug
      const party = await Party.findByOrFail('party_slug', party_slug, 'owner_id', auth.user.id)


      let cloudinary_response = await Cloudinary.upload(banner)

      if (!cloudinary_response.status) {
        response
        .status(400)
        .send({
          message: 'Ocorreu um erro, tente novamente!'
        })
      }

      party.banner_link = cloudinary_response.url
      if (party.save()) {
        response
        .status(201)
        .send({
          upload_info: cloudinary_response,
          message: 'Upload realizado com sucesso!'
        })
      }else{
        response
        .status(400)
        .send({
          message: 'Ocorreu um erro, tente novamente!'
        })
      }
    }catch(error){
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }


  async avatar ({ request, response, auth }) {

    try{
      const avatar = request.file('avatar', {
        types: ['image'],
        size: '5mb'
      })

      const user = await User.findByOrFail('id', auth.user.id)

      let cloudinary_response = await Cloudinary.upload(avatar)

      if (!cloudinary_response.status) {
        response
        .status(400)
        .send({
          message: 'Ocorreu um erro, tente novamente!'
        })
      }

      user.avatar = cloudinary_response.url
      if (user.save()) {
        response
        .status(201)
        .send({
          upload_info: cloudinary_response,
          message: 'Upload realizado com sucesso!'
        })
      }else{
        response
        .status(400)
        .send({
          message: 'Ocorreu um erro, tente novamente!'
        })
      }
    }catch(error){
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }
}

module.exports = FileController

'use strict'

const Helpers = use('Helpers')
const fs = use('fs')
const bytes = use('bytes')
const Party = use('App/models/Party')
const User = use('App/models/User')


class FileController {

  async upload({ request, response, auth }){
    try {
      const banner = request.file('banner', {
        types: ['image'],
        size: '5mb'
      })

      const party_slug = request.params.party_slug
      const party = await Party.findByOrFail('party_slug', party_slug, 'owner_id', auth.user.id)

      let newFileName = `${banner.clientName.replace(/ /g, '_').split('.').slice(0, -1).join('.')}_${new Date().getTime()}_${Math.floor(Math.random() * 100)}.${banner.extname}`

      if (party.banner_link) {
        newFileName = party.banner_link.split('/')
        newFileName = newFileName[newFileName.length - 1]
      }

      await banner.move(Helpers.publicPath('/uploads/banners'), {
        name: newFileName,
        overwrite: true
      })

      if (!banner.moved()) {
        return banner.error()
      }


      party.banner_link = `/uploads/banners/${banner.fileName}`
      if (party.save()) {
        response
        .status(201)
        .send({
          message: 'Upload realizado com sucesso!'
        })
      }else{
        response
        .status(400)
        .send({
          message: 'Ocorreu um erro, tente novamente mais tarde!'
        })
      }
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }


  async avatar({ request, response, auth }){
    try {
      const avatar = request.file('avatar', {
        types: ['image'],
        size: '5mb'
      })

      const user = await User.findByOrFail('id', auth.user.id)

      let newFileName = `${avatar.clientName.replace(/ /g, '_').split('.').slice(0, -1).join('.')}_${new Date().getTime()}_${Math.floor(Math.random() * 100)}.${avatar.extname}`

      if (user.avatar) {
        newFileName = user.avatar.split('/')
        newFileName = newFileName[newFileName.length - 1]
        console.log(newFileName)
      }

      await avatar.move(Helpers.resourcesPath('/uploads/avatars'), {
        name: newFileName,
        overwrite: true
      })

      if (!avatar.moved()) {
        return avatar.error()
      }

      console.log(user)
      user.avatar = `/uploads/avatars/${avatar.fileName}`
      if (user.save()) {
        response
        .status(201)
        .send({
          message: 'Upload realizado com sucesso!'
        })
      }else{
        response
        .status(400)
        .send({
          message: 'Ocorreu um erro, tente novamente mais tarde!'
        })
      }
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }
}

module.exports = FileController

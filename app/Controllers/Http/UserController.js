'use strict'

class UserController {
  async favorites({auth}){
    let favs = auth.user.favorites
    var result = [];
    for(var i in favs){
      result.push(favs[i]);
    }

    const processes = await Database.collection('processes').where({codigoProc: {$in: result}}).find()
    return {processes: processes}

  }
}

module.exports = UserController

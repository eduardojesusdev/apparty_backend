'use strict'

class UserController {
  async favorites({view, auth}){
    let favs = auth.user.favorites
    var result = [];
    for(var i in favs){
      result.push(favs[i]);
    }

    const processes = await Database.collection('processes').where({codigoProc: {$in: result}}).find()
    return {processes: processes}

  }

  async changePresence({request, auth}){
    const user = await User.find(auth.user._id)
    var thisFav = request.body.codigoProc
    var added = ''
    var removed = ''
    if (thisFav in user.favorites) {
      function deleteFromObject(keyToDelete, obj) {
        var l = keyToDelete.length;
        for (var key in obj)
            if (key.substr(0, l) == keyToDelete)
                delete obj[key];
    }
    deleteFromObject(thisFav, user.favorites)
    removed = true
    }else{
      let json = user.favorites
      json[thisFav] = thisFav

      user.favorites = json
      added = true
    }

    if(await user.save()){
      return {add: added, removed: removed}
    }else{
      return false
    }
  }
}

module.exports = UserController

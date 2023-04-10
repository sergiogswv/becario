
const objects = [{ id: 1, storeName: 'Name stored', phone: '55555555', webSite: 'https://website.com', photoUrl: 'urlPhoto.com' }, { id: 2, storeName: 'Name stored2', phone: '55555555', webSite: 'https://website-dos.com', photoUrl: 'urlPhoto-dos.com' }]

exports.getItems = (req, res) => {
  res.json(objects)
}

exports.postItems = (req, res) => {
  const { id, storeName, phone, webSite, photoUrl } = req.body

  try {
    if (Object.keys(req.body).length === 0) {
      return res.json({ msg: 'The task is empty, please fill the fields :)' })
    }

    newObject = { id, storeName, phone, webSite, photoUrl }
    let newArray = objects
    newArray.push(newObject)

    res.json({ msg: 'Added Successful', newArray })
  } catch (error) {
    console.log(error)
  }

}
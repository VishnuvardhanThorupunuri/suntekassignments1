### Create database
    use db-name
### Read databases
    show databases
### Create collection
    db.createCollection(collection-name)
### Updata documents
  updateOne(condition,update)
  updateMany(condition,update)
### Read documents
    findOne(condition,update)
    findMany(condition,update)
### Delete
    deleteOne()
    deleteMany()


$all --> used to retrieve data in unordered form
$set --> used to make modifications
$push ---> used to push into sets
$addToSet--> if the input is exists it ignores 
$pop---> used to remove first and last elements in a set
$pull--> remove the specific one

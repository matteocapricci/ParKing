//import * as storage from "./firebase/storage/manage_storage.js"
import * as database from "./crudOp.js"

// firebase function
/**
 * store an object in the database
 * @param obj obj to store
 * @param collection_name name of the object collection (table)
 * @param error error function
 * @param postprocessing postprocessing function
 * @returns {Promise<void>}
 */
export const store_doc =  async function (obj, collection_name, error= ()=>{}, postprocessing = ()=>{}) {
   return database.store_doc(obj, collection_name, error, postprocessing)
}

/**
 * store an object in the database and set its id
 * @param obj obj to store
 * @param collection_name name of the object collection (table)
 * @param id id
 * @param error error function
 * @param postprocessing postprocessing function
 * @returns {Promise<void>}
 */
export const store_doc_by_id = async function (obj, collection_name, id, error= ()=>{}, postprocessing = ()=>{}) {
   return database.store_doc_by_id(obj, collection_name, id, error, postprocessing)
}

/**
 * load object
 * @param collection_name name of the object collection (table)
 * @param id id of the obj in the database
 * @param postprocessing postprocessing function
 * @param error error function
 * @param do_not_exist do_not_exist function
 * @returns {Promise<*|undefined>}
 */
export const load_docs = async function (collection_name, id, postprocessing, error = ()=>{}, do_not_exist = ()=>{}){
    return database.load_docs(collection_name, id, postprocessing, error, do_not_exist)
}

/**
 * updete an obj in the database
 * @param obj obj with new values
 * @param collection_name name of the object collection (table)
 * @param id id of the obj in the database
 * @param error error function
 * @param postprocessing postprocessing function
 * @param do_not_exist do_not_exist function
 * @returns {Promise<void>}
 */
export const update_doc = async function (obj, collection_name, id, error = ()=>{}, postprocessing = ()=>{}, do_not_exist = ()=>{}){
    return database.update_doc(obj, collection_name, id, error, postprocessing, do_not_exist)
}


/**
 * delete a document (tuple)
 * @param collection_name name of the object collection (table)
 * @param id id of the document
 * @param error error function
 * @param postprocessing postprocessing function
 * @returns {Promise<void>}
 */
export const delete_doc = async function(collection_name, id, error = ()=>{}, postprocessing = ()=>{}){
    return database.delete_doc(collection_name, id, error, postprocessing)
}

/**
 * delete a document with by attribute
 * @param collection_name name of the object collection (table)
 * @param attribute_name name of the attribute to check
 * @param attribute value of the attribute to check
 * @param error error function
 * @param postprocessing postprocessing function
 * @returns {Promise<void>}
 */
export const delete_doc_by_attribute = async function(collection_name, attribute_name, attribute, error = ()=>{}, postprocessing = ()=>{}){
    return database.delete_doc_by_attribute(collection_name, attribute_name, attribute, error, postprocessing)
}

/**
 * count number of results
 * @param attribute_val attribute value
 * @param collection_name name of the object collection (table)
 * @param attribute_name atribute for the where clouse
 * @returns {Promise<*|undefined>}
 */
export const count_docs = async function(attribute_val, collection_name, attribute_name){
    return database.count_docs(attribute_val, collection_name, attribute_name)
}


/**
 * load object ordered by
 * @param collection_name name of the object collection (table)
 * @param order_by_field attribute to order
 * @param order_direction (asc/desc)
 * @param max_item_number max number of results
 * @param error error function
 * @param postprocessing postprocessing function
 * @returns {Promise<*[]|undefined>}
 */
export const load_ordered_docs = async function (collection_name, order_by_field, order_direction="asc", max_item_number = null, error = ()=>{}, postprocessing = ()=>{}) {
    return database.load_ordered_docs(collection_name,order_by_field,order_direction,max_item_number,error,postprocessing)
}


//Prosegui facendo le query di storage
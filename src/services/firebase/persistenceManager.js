import * as storage from "./imageStorage/imageStorage.js"
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

/**
 * query a document
 * @param attribute attribute value
 * @param collection_name name of the object collection (table)
 * @param attribute_name atribute name
 * @param limit_number max number of results
 * @param order_by attribute to order
 * @param order_direction order direction (Desc, asc)
 * @param error error function
 * @param postprocessing postprocessing function
 * @param do_not_exist do_not_exist function
 * @returns {Promise<*|undefined>}
 */
export const get_docs_by_attribute = async function(attribute, collection_name, attribute_name, limit_number=null, order_by =null, order_direction = "asc", error = ()=>{}, postprocessing = ()=>{}, do_not_exist = ()=>{}){
    return database.get_docs_by_attribute(attribute, collection_name, attribute_name, limit_number, order_by, order_direction , error , postprocessing , do_not_exist )
}


//Image Storage

/**
 * upload an img
 * @param path_img path of the img
 * @param file name to databese
 * @param postprocessing postprocessing function
 * @param error error function
 * @returns {Promise<void>}
 */
export let push_img = async function (path_img, file,  postprocessing= ()=>{}, error = ()=>{}) {
    return storage.push_img(path_img, file,  postprocessing, error)
}

/**
 * get image
 * @param path_img path of the img
 * @param postprocessing postprocessing function
 * @param error error function
 * @returns {Promise<string|undefined>}
 */
export let pull_img_url = async function (path_img, postprocessing= ()=>{}, error = ()=>{}){
    return storage.pull_img_url(path_img, postprocessing, error)
}

/**
 * delete img
 * @param path_img name img to delete
 * @param postprocessing postprocessing function
 * @param error error function
 * @returns {Promise<void>}
 */
export let delete_img = async function (path_img, postprocessing= ()=>{}, error = ()=>{}){
    return storage.delete_img(path_img, postprocessing, error)
}
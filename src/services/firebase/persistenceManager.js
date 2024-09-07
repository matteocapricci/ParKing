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

/**
 * Retrieves documents from a specified collection based on given attributes and optional sorting and limiting criteria.
 * 
 * This function queries a database collection for documents that match the provided attributes. You can also specify 
 * sorting criteria and limit the number of results returned. Optionally, you can provide callback functions to handle 
 * errors and to process the results after retrieval.
 * 
 * @param {string} collection_name - The name of the collection from which to retrieve documents.
 * @param {Object} attributes_name_value - An object where keys are attribute names and values are the values to filter by. 
 *                                        This object defines the criteria for which documents should be retrieved.
 * @param {string} [order_by=null] - (Optional) The field by which to sort the results. If not provided, results are not sorted.
 * @param {string} [order_direction="asc"] - (Optional) The direction of sorting. Can be either 'asc' for ascending or 'desc' for descending. Default is 'asc'.
 * @param {number} [limit_number=null] - (Optional) The maximum number of documents to retrieve. If not provided, there is no limit.
 * @param {function} [error=() => {}] - (Optional) A callback function to handle errors that occur during the query. The function receives the error object.
 * @param {function} [postprocessing=() => {}] - (Optional) A callback function to process the retrieved documents after the query. The function receives the result of the query.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of documents matching the query criteria. The array is empty if no documents match.
 */

export const load_docs_by_attributes = async function(collection_name, attributes_name_value, order_by = null, order_direction = "asc", limit_number = null, error = () => {
}, postprocessing = () => {
}){
    return database.load_docs_by_attributes(collection_name, attributes_name_value, order_by, order_direction, limit_number, error, postprocessing)
}

/**
 * 
 * @param {} latitude_attribute 
 * @param {*} longitude_attribute 
 * @param {*} error 
 * @param {*} postprocessing 
 * @returns 
 */
export const load_parkingNearSerchedPosition = async function(latitude_attribute, longitude_attribute, order_by, error = () => {}, postprocessing = () => {} ){
    return database.load_parkingNearSerchedPosition(latitude_attribute, longitude_attribute, order_by, error, postprocessing)
}

/**
 * Load all documents from a specified collection in the database.
 * @param {string} collection_name - The name of the collection to fetch documents from.
 * @param {function(Array)} postprocessing - A callback function to process the fetched data.
 * @param {function} [error=()=>{}] - A callback function to handle errors.
 * @param {function} [empty=()=>{}] - A callback function to handle the case when the collection is empty.
 * @returns {Promise<Array>} - A promise that resolves to an array of documents from the collection.
 */
export const load_all_docs = async function (collection_name, postprocessing, error = () => {}, empty = () => {}) {
    return database.load_all_docs(collection_name, postprocessing, error, empty);
}
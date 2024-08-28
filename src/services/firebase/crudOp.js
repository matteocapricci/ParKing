import { collection, getDocs, addDoc, setDoc, deleteDoc, updateDoc, doc, getDoc, orderBy, limit, query, where,  getCountFromServer} from "firebase/firestore"
import { firestore } from "./confFirebase";

const db = firestore;

export const store_doc =  async function (obj, collection_name, error= ()=>{}, postprocessing = ()=>{}) {
    try {
        if( typeof(obj) == "function"){
            obj = obj()
        }

        let col= collection(db, collection_name)
        let result = await addDoc(col, obj)
        console.log(result)

        console.log("ok")
        postprocessing()

    }
    catch (e) {
        console.log(e)
        console.log("erroreeee")
        error()
    }
}

export const store_doc_by_id = async function (obj, collection_name, id, error= ()=>{}, postprocessing = ()=>{}) {
    try{

        if( typeof(obj) == "function"){
            obj = obj()
        }
        if( typeof(id) == "function"){
            id = id()
        }

        let result = await setDoc(doc(db, "Review", id), obj)

        console.log("ok")
        postprocessing()

        }
    catch (e) {
        console.log(e)
        error()
    }
}

export const load_docs = async function (collection_name, id, postprocessing, error = ()=>{}, do_not_exist = ()=>{}){
    try{

        if( typeof(id)){
            id = id()
        }

        let doc_ref = doc(db, collection_name, id)
        let snapshot = await getDoc(doc_ref)

        if( snapshot.exists() ){
            let result = snapshot.data()
            postprocessing(result)
            return result
        }
        else{
            console.log("do not exist")
            do_not_exist()
        }
    }
    catch (e){
        console.log(e)
        error()
    }
}

export const update_doc = async function (obj, collection_name, id, error = ()=>{}, postprocessing = ()=>{}, do_not_exist = ()=>{}){
    try{
        if (typeof(obj) == "function"){
            obj = obj()
        }
        if (typeof(id) == "function"){
            id = id()
        }

        let doc_ref = doc(db, collection_name, id)
        let snapshot = await getDoc(doc_ref)


        if( snapshot.exists() ){
            await updateDoc(doc_ref, obj)
            postprocessing()
            console.log("ok")

        }
        else {
            console.log("do not exist")
            do_not_exist()
        }
    }
    catch (e) {
        console.log(e)
        error()
    }
}


export const delete_doc = async function(collection_name, id, error = ()=>{}, postprocessing = ()=>{}){
    try{

        if( typeof(id) == "function"){
            id = id()
        }

        await deleteDoc(doc(db, collection_name, id))

        postprocessing()
        console.log("ok")
    }
    catch (e) {
        console.log(e)
        error()
    }
}


export const delete_doc_by_attribute = async function(collection_name, attribute_name, attribute, error = ()=>{}, postprocessing = ()=>{}){
    try{

        let q = query(collection(db, collection_name), where(attribute_name, "==", attribute));

        let snapshot = await getDocs(q)

        snapshot.forEach((snap_item) => {
            deleteDoc(doc(db, collection_name, snap_item.id))
        })

        postprocessing()
        console.log("ok")
    }
    catch (e) {
        console.log(e)
        error()
    }
}


export const count_docs = async function(attribute_val, collection_name, attribute_name){
    try{
        if (typeof (attribute_val) == "function") {
            attribute_val = attribute_val()
        }
        let q = query(collection(db, collection_name), where(attribute_name, "==", attribute_val));

        let snapshot = await getCountFromServer(q);
        return snapshot.data().count
    }
    catch(e){
        console.log(e)
    }
}


export const load_ordered_docs = async function (collection_name, order_by_field, order_direction="asc", max_item_number = null, error = ()=>{}, postprocessing = ()=>{}) {
    try {

        let q
        // execute operation
        if (max_item_number == null) {
            q = query(collection(db, collection_name),orderBy(order_by_field, order_direction));
        } else {
            q = query(collection(db, collection_name),orderBy(order_by_field, order_direction), limit(max_item_number));
        }

        let snapshot = await getDocs(q)
        // postprocessing
        let result = []
        snapshot.forEach((snap_item) => {
            result.push({
                ...snap_item.data(),
                doc_id: snap_item.id
            })
        })
        postprocessing(result)
        return result
    } catch (e) {
        console.log(e)
        error()
    }
}
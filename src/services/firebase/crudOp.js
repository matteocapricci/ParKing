import { collection, getDocs, addDoc, setDoc, deleteDoc, updateDoc, doc, getDoc, orderBy, limit, query, where,  getCountFromServer} from "firebase/firestore"
import { firestore } from "./confFirebase";

const db = firestore;

const DELTAKM = 0.2;

export const store_doc =  async function (obj, collection_name, error= ()=>{}, postprocessing = ()=>{}) {
    try {
        if( typeof(obj) == "function"){
            obj = obj()
        }

        let col= collection(db, collection_name)
        console.log(col)
        let result = await addDoc(col, obj)
        console.log("RISULTATO")
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

export const load_by_doc_id = async (collection, docId) => {
    try {
      // Crea un riferimento al documento specifico tramite il suo doc_id
      const docRef = doc(db, collection, docId);
      
      // Recupera il documento
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Se il documento esiste, ritorna i dati
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        // Il documento non esiste
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

export const get_docs_by_attribute = async function(attribute, collection_name, attribute_name, limit_number=null, order_by =null, order_direction = "asc", error = ()=>{}, postprocessing = ()=>{}, do_not_exist = ()=>{}){
    try{
        // preprocessing
        if( typeof(attribute) == "function"){
            attribute = attribute()
        }

        // execute operation
        let q
        if( limit_number == null && order_by == null){
            q = query(collection(db, collection_name), where(attribute_name, "==", attribute));
        }
        else if (limit_number == null){
            q = query(collection(db, collection_name), where(attribute_name, "==", attribute), orderBy(order_by, order_direction));
        }
        else if(order_by == null) {
            q = query(collection(db, collection_name), where(attribute_name, "==", attribute), limit(limit_number));
        }
        else{
            q = query(collection(db, collection_name), where(attribute_name, "==", attribute), orderBy(order_by, order_direction), limit(limit_number));
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
    }
    catch (e) {
        console.log(e)
        error()
    }

}

export const load_docs_by_attributes = async function (collection_name, attributes_name_value, order_by = null, order_direction = "asc", limit_number = null, error = () => {}, postprocessing = () => {}) {
    try {
        let col = collection(db, collection_name); 
        let q = query(col); 

        for (let attribute_name in attributes_name_value) {
            q = query(q, where(attribute_name, "==", attributes_name_value[attribute_name]));
        }

        if (order_by != null) {
            q = query(q, orderBy(order_by, order_direction));
        }

        if (limit_number != null) {
            q = query(q, limit(limit_number));
        }

        let snapshot = await getDocs(q);

        let result = [];
        snapshot.forEach((snap_item) => {
            result.push({
                ...snap_item.data(),
                doc_id: snap_item.id
            });
        });

        postprocessing(result);
        return result;
    } catch (e) {
        console.log(e);
        error();
    }
}

export const load_parkingNearSerchedPosition = async function ( latitude_attribute, longitude_attribute, size_attribute, checkIn_attribute, checkOut_attribute, order_by, error = () => {}, postprocessing = () => {} ) {
    try {
        const deltaPosition = {
            "latMax": latitude_attribute + DELTAKM,
            "latMin": latitude_attribute - DELTAKM,
            "lonMax": longitude_attribute + DELTAKM,
            "lonMin": longitude_attribute - DELTAKM
        }
        
        let capitalizedSizeAttribute = size_attribute.charAt(0).toUpperCase() + size_attribute.slice(1);
        
        let col = collection(db, 'Parking'); 
        let q = query(col);
        if (order_by !== 'default') {
            if (order_by === "rating"){
                q = query(q, orderBy('avg_rating', 'desc'));
            } else {
                q = query(q, orderBy('timePrice', 'asc'));
            }
        }
        q = query(q, where('location.latitude', '>=', deltaPosition.latMin));
        q = query(q, where('location.latitude', '<=', deltaPosition.latMax));
        q = query(q, where('location.longitude', '>=', deltaPosition.lonMin));
        q = query(q, where('location.longitude', '<=', deltaPosition.lonMax));

        let snapshot = await getDocs(q);

        let result = [];
        snapshot.forEach((snap_item) => {
            let found = false;
            if (size_attribute !== "any"){
                snap_item.data().parkingSlots.forEach((parkingSlot) => {
                    if(parkingSlot.size === capitalizedSizeAttribute && !found) {
                        result.push({
                            ...snap_item.data(),
                            doc_id: snap_item.id
                        });
                        found = true;
                    }
                })
            } else {
                result.push({
                    ...snap_item.data(),
                    doc_id: snap_item.id
                });
            }
        });

        let availableParking = [];

        for (let res of result) {
            for (let parkSlot of res.parkingSlots) {
                console.log(res.doc_id);
                console.log(parkSlot.name);
                let linkedReservations = await load_docs_by_attributes("Reservations", {"parkingId": res.doc_id, "parkingSpot.name": parkSlot.name});

                console.log(linkedReservations);
                
                if (linkedReservations.length > 0) {
                    let isAvailable = true;
                    
                    for (let linkedReservation of linkedReservations) {
                        let checkIn = new Date(linkedReservation.CheckIn);
                        let checkOut = new Date(linkedReservation.CheckOut);
                        let checkIn_attr = new Date(checkIn_attribute);
                        let checkOut_attr = new Date(checkOut_attribute);

                        if ((checkIn_attr >= checkIn && checkIn_attr <= checkOut) || (checkOut_attr >= checkIn && checkOut_attr <= checkOut)) {
                            isAvailable = false;
                            break;
                        }
                    }

                    if (isAvailable && parkSlot.size === capitalizedSizeAttribute ) {
                        parkSlot.isAvailable = true;
                        availableParking.push({ ...res, parkingSlots: [parkSlot] });
                    }
                } else {
                    if (capitalizedSizeAttribute !== "Any") {
                        if (parkSlot.size === capitalizedSizeAttribute ) {
                            parkSlot.isAvailable = true;
                            availableParking.push({ ...res, parkingSlots: [parkSlot] });
                        }
                    } else {
                        parkSlot.isAvailable = true;
                        availableParking.push({ ...res, parkingSlots: [parkSlot] });
                    }
                }
            }
        }

        let uniqueAvailableParking = availableParking.reduce((acc, current) => {
            let found = acc.find(item => item.doc_id === current.doc_id);
            
            if (found) {
                found.parkingSlots = [
                    ...found.parkingSlots,
                    ...current.parkingSlots.filter(slot => slot.isAvailable && !found.parkingSlots.some(existingSlot => existingSlot.name === slot.name))
                ];
            } else {
                acc.push(current);
            }

            return acc;
        }, []);

        postprocessing(uniqueAvailableParking);
        return uniqueAvailableParking;

    } catch (e) {
        console.log(e);
        error();
    }
}


export const load_all_docs = async function (collection_name, postprocessing = () => {}, error = () => {}, empty = () => {}) {
    try {
        const coll_ref = collection(db, collection_name);
        
        const snapshot = await getDocs(coll_ref);

        if (snapshot.empty) {
            console.log("Collection is empty");
            empty();
            return [];
        } else {
            const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            postprocessing(result);
            return result;
        }
    } catch (e) {
        console.log(e);
        error();
    }
}

export const load_free_parkingSpot_by_parkingId = async function (parking_id, size, error = () => {}, postprocessing = () => {}) {
    
}
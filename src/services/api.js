
import firebase from 'react-native-firebase'
const BASE_URL = "http://api.sl.se/api2/typeahead.json"

//hardcoded for testing
const ResponseData=[
	{
	Name: "Tekniska högskolan (Stockholm)",
	SiteId: "9204",
	Type: "Station",
	X: "18071707",
	Y: "59345543"
	},
	{
	Name: "Scania tekniskt centrum (Södertälje)",
	SiteId: "7585",
	Type: "Station",
	X: "17635137",
	Y: "59166649"
	},
	{
	Name: "Apoteksbolaget (Huddinge)",
	SiteId: "7114",
	Type: "Station",
	X: "17903806",
	Y: "59261368"
	},
	{
	Name: "Apoteksskogen (Upplands Väsby)",
	SiteId: "5326",
	Type: "Station",
	X: "17918630",
	Y: "59525939"
	},
	{
	Name: "Hammarby apotek (Upplands Väsby)",
	SiteId: "5305",
	Type: "Station",
	X: "17924859",
	Y: "59529454"
	},
	{
	Name: "Spettekaksvägen (Stockholm)",
	SiteId: "1808",
	Type: "Station",
	X: "18102468",
	Y: "59259912"
	},
	{
	Name: "Stadsbiblioteket (Stockholm)",
	SiteId: "1030",
	Type: "Station",
	X: "18055311",
	Y: "59344294"
	},
	{
	Name: "Arkitektur-/Moderna museet (Stockholm)",
	SiteId: "1026",
	Type: "Station",
	X: "18085290",
	Y: "59325156"
	},
	{
	Name: "Hypoteksvägen (Stockholm)",
	SiteId: "1731",
	Type: "Station",
	X: "17984727",
	Y: "59294368"
	},
	{
	Name: "Apoteket Tärnan (Lidingö)",
	SiteId: "8923",
	Type: "Station",
	X: "18135521",
	Y: "59365086"
	}
]



export const fetchStations = async () => {
	const url_params = BASE_URL + "?key=" + "3a8ee3ceaa10415ab72d0909968f7f1f" +  "&searchstring=" + "tek"
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
  	headers.append('Accept', 'application/json');
  	headers.append('Access-Control-Allow-Origin', '*');
	 try{
	// 	let response = await fetch(url_params, {
	// 		method: 'get',
 //            headers: headers,
 //            mode:'cors'
	// 	})
	// 	//const response = await fetch("https://api2.stage.newstag.com/topnews")
	// 	let data = await response.json();
	// 	return data.ResponseData
	return ResponseData
	} catch(e){
		console.log(e)
	}

}

export const addComment = async (comment) => {
	let commentRef = firebase.firestore().collection('comments')
	try{
		const response = await commentRef.add(comment)
		commentRef.doc(response.id).update({id:response.id})
		let data = await response.get()
		return data.data()
		
	} catch(e){
		console.log(e)
	}
}

export const upvote = async(id,inc) => {
	let commentRef = firebase.firestore().collection('comments').doc(id)
	let numberOfUpvotes;
	commentRef.get().then((doc) => {
		let data = doc.data()
		//let upvotes = data.hasOwnProperty("upvotes") ? (data.upvotes + inc): 0
		let upvotes = 0
		if(data.hasOwnProperty("upvotes")){
			if(data.upvotes + inc > 0){
				upvotes = data.upvotes + inc
			}
			
		}
		numberOfUpvotes = upvotes 
		commentRef.update({
			upvotes: numberOfUpvotes
		})
	})
	
	//console.log(commentRef)
}

export const fetchPodcasts = async (id) => {
	let comments =[]
	try{
		const response = await firebase.firestore().collection('comments').where("podcastid", "==" , id).get()
		let data = await response.forEach(doc => {
				comments.push(doc.data())
				return doc.data()
			});
		
		return comments
		
	} catch(e){
		console.log(e)
	}
}
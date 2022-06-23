//update server
//implementation from https://jaygould.co.uk/2020-10-24-big-data-pt-2-socket-progress-bar/

const uploadedAdresses = uploadedDataArray
const originLocationData = objectContainingLatLngofOriginLocation
const searchRadius = 10

const io = req.app.get("io");
const sockets = req.app.get("sockets");
const thisSocketId = sockets[thisSessionId];
const socketInstance = io.to(thisSocketId);
socketInstance.emit("uploadProgress", "file uploaded, processing data..");


let chunksProcessed = 0;
let chunkSize = 100;

const uploadChuncks = chunkArray(uploadedAdresses, chunkSize);

const dataWithDbPostcode = await Promise.map(
    uploadChuncks,
    async (uploadChunk: any) => {
        const dbChunk = await db.postcodes.findAll( {
            where: {
                postcodeNoSpace: {
                    [db.Sequelize.Op.in]: uploadChunk
                }
            }
        })

        const progress = Math.round(((chunkSize * chunksProcessed) / totalRows) * 100 * 10)/10;
        chunksProcessed++;

        socketInstance.emit("uploadProgress", `${progress}%`);

        return dbChunk;
    },
    { concurrency: 1 }
)

const processedData = dataWithDbPostcode.flat().map(address => {
    const distance = distance(
        postocodeData.latitude,
        postocodeData.longitude,
        originLocationData.latitude,
        originLocationData.longitude
    )
return {
        coordinates: {
            latitude: address.dbRow.latitude,
            longitude: address.dbRow.longitude
        },
    distance,
    isWithinRange: distance < this.radius ? "yes" : "no",
}
})

//original code chunckArray(array, chunkSize){
function chunckArray(arr, chunk_size){
    var results = [];

    while (arr.length) {
        results.push(arr.splice(0, chunk_size));
    }
    return results;
}
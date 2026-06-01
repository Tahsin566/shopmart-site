import mongoose from "mongoose"
import { mode, mongo_url, mongo_url_dev } from "./configEnv"

export const MongoConnect = async () => {
    try {
        const conn = await mongoose.connect(mode === "development" ? mongo_url_dev : mongo_url)

        
        
        if (conn) {
            console.log("Connected")
            console.log(conn.connection.host)
        }
    } catch (error) {
        console.log("Not connected")
        process.exit(1)
    }
}
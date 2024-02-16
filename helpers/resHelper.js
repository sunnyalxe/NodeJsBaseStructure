export const createRes = (message = "Success", success = 1, data = []) => {
    return {
        result : {
            success : success,
            message : message
        },
        data : data
    }
}
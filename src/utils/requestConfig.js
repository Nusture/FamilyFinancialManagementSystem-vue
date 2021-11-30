let url = ''
if (process.env.NODE_ENV === 'development') {
    url = 'http://192.168.3.202:8081/'
}
export default url
function adduser (username, age) {
    const dataStruc = {
        username : null,
        age:null
    }
    const data = fs.readFileSync('datasource.json','utf-8');
    let newData = JSON.parse(data)
    console.log(newData)
    let prop = Object.create(dataStruc);
    prop.username = username
    prop.age = age
    newData.push(prop)
    // write 
    fs.writeFileSync('datasource.json',JSON.stringify(newData) ); 
}
module.exports = adduser
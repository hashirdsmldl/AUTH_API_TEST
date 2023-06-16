const { Products } = require("../Schema/productsschema");

exports.createProduct = async(req, res) => {
    const body = req.body;
    console.log(body)
    const product=new Products(body);
try{
    const dataToSave = await product.save();
    res.status(200).json(dataToSave)
}
catch(error){
    res.status(400).json({message: error.message})
}
    

   

    // const result = products.find(x => x.id === body.id)
    // const check = result ? 'present' : 'not'
    // if (check === 'present') {
    //     res.status(404).send('not found')
    // }
    // else {
    //     products.push(body);
    //     res.json(products)
    // }

}
exports.readProducts = async(req, res) => {
    try{
        const data = await Products.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.readProduct =async (req, res) => {
    try{
        const data = await Products.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


exports.deleteProduct=async(req,res)=>
 {
    try {
        const id = req.params.id;
        const data = await Products.findByIdAndDelete(id)
        console.log(data)
        res.send(`Document with ${data.title} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
 }
exports.updateProduct = async(req, res) => 
{
    try {
        const id = req.params.id;
        const updatedData = req.body;
        //for updated data
        const options = { new: true };

        const result = await Products.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }



}

// exports.replaceProducts = (req, res) => {

//     const id = +req.params.id;
//     const body = req.body;

//     const productIndex = products.findInded(p => p.id === id)

//     products.splice(productIndex, 1, { ...body, id: id })
//     res.status(201).json();
// }
 

  // const id = +req.params.id;
    // const body = req.body;
    // // console.log(body);
    // const productIndex = products.findInded(p => p.id === id)
    // const product = products[productIndex]
    // products.splice(productIndex, 1, { ...product, ...body })
    // res.status(201).json();
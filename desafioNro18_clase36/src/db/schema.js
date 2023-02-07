import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userCollection = 'userLocal';
const productsCollection = 'productos';
const cartCollection = 'carts';

const ProductsSchema = new Schema(
    {
        title: { type: String, require: true, max: 100 },
        price: { type: Number, require: true, max: 1000 },
        codigo: { type: String, require: true, max: 100 },
        stock: { type: Number, required: true },
        descripcion: { type: String, require: true, max: 100 },
        img: { type: String, require: true, max: 100 },
    },
    { timestamps: true }
);

const CartSchema = new Schema(
    { productos: { type: Array } },
    { timestamps: true }
);



const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    addres: { type: String, required: true },
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const UserModel = model(userCollection, UserSchema);
const ProductsModel = model(productsCollection, ProductsSchema);
const CartModel = model(cartCollection, CartSchema);

export { ProductsModel, CartModel, UserModel };
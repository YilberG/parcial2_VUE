<template>
    <div style="background-color:rgba(16, 182, 160,0.7)">

    
    <div class="row p-2  border-bottom ">
        <div class="col-1 align-self-center">
            <a class="btn btn-outline-danger btn-sm rounded-rectangle text-danger" href="/Imagenes" role="button"> 
            <font face = "Cooper Black" size = "4">volver</font>
            </a>
        </div>
        <div class="col-11 align-self-center text-center">
            <font face = "Cooper Black" size = "7">Crear imagen</font>
        </div>
        <hr>
    </div>
    <br>
    <div class="row ">
        <div class="col-12 col-md-6 text-center mx-auto">
            <form
            @submit.prevent="subirimagen"
            @change="prevista"
            enctype="multipart/form-data">
                <input type="file" ref="file" id="file" accept="image/*" required>
                &nbsp;
                <button type="submit" class="btn btn-info btn-sm">subir</button>
            </form>
            <span>
                 Seleccione una categoria: </span>
            <div v-if="alerta === true">
                <div class="alert alert-danger" role="alert">
                    Seleccione almenos una categoria
                </div>
            </div>
            <div v-for="categoria in cat" :key="categoria.id">
                <table >
                    <tr border="4px">
                        <td border="4px">
                <input type="checkbox"  :id="categoria.nombre" :value="categoria.id" v-model="checkedNames" > 
                <label :for="categoria.nombre" >{{ categoria.nombre }}</label>
                        </td>
                    </tr>
                </table>

            </div>
        </div>
        <div class="col-12 col-md-6 text-center justify-content-center  mx-auto" style="height: 500px;">
            <p><b>Previsualizacion:</b></p>
            <br>
            <div v-if="image === ''">
                <div class="alert alert-danger" role="alert">
                    No a seleccionado ningun archivo
                </div>
            </div>
            <div>
                <img class="card-img-top" :src="image" alt="" >
            </div>
        </div>
    </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Subir',
    data(){
        return{
            cat: [],
            checkedNames: [],
            image: "",
            subirimage: "",
            alerta: false
        }
    },
    mounted() {
        axios.get('http://localhost:1337/categorias').then((response) => {
            this.cat = response.data
        })
    },
    methods:{
        prevista(e){
            this.image = URL.createObjectURL(e.target.files[0])
            this.subirimage = e.target.files[0]
        },
        subirimagen(){
            if(this.checkedNames.length == 0)
            {
                this.alerta = true
            }else{
                this.alerta = false
                var formData = new FormData();
                let data = { categorias: this.checkedNames }

                formData.append("files.url", this.subirimage);
                formData.append("data", JSON.stringify(data));
                
                axios.post("http://localhost:1337/imagenes", formData ,{
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        "Content-Type": 'multipart/form-data',
                    }
                }).then((response) => {
                    this.$router.push("/")
                })
            }
        }
    }
}

</script>

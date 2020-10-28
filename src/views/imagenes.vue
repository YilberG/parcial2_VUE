<template>
    <div class="row p-2  sticky-top border-bottom " style="background-color:rgba(16, 182, 160,0.7)">
        <div class="col-1 align-self-center ">
            <a class="btn btn-outline-danger" href="/" role="button">
            <font size = "2" face = "Cooper Black">volver</font>
            </a>
        </div>
        <div class="col-9 align-self-center text-center ">
            <a target="_blank"><img alt="Sígueme en Facebook" height="90" width="100" src="https://3.bp.blogspot.com/-9oNbCauNwds/XCrI4LDadeI/AAAAAAAAIBA/TknYHABL7oo-pKdMEVtYF1t454sDaA9AwCLcBGAs/s1600/xing.png" title="Sígueme en Facebook"/></a><font face = "Cooper Black" size = "7">Mis imagenes</font>
        </div>
        <div class="col-2 align-self-center text-center">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn btn-outline-success" href="/Imagenes/Create" role="button">
                <font size = "2" face = "Cooper Black">Subir imagen</font>
            </a>
        </div>
    

    
    <div class="row justify-content-center " style="background-color:rgba(16, 182, 160,0.7)">
    <div class="col-12 col-md-5 col-lg-3 m-2" v-for="imagen in imagenes" :key="imagen.id">
        <table border="5px">
            <tr>
                <td>
                         <div class="card" style="width: 18rem;">
            <a :href="imagen.url.name" target="_blank"  download="image.jpg"><img :src="'http://localhost:1337'+ imagen.url.url" class="card-img-top"></a>
              <div class="card-body">
                <li type="disc">Publicada por: {{ imagen.user.username }}</li>
              </div>
        </div>
                </td>
            </tr>


        </table>
   
        <br>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Mis imagenes',
    data(){
    return{
      user: {},
      imagenes: []
    }
    },
    mounted(){
        this.misimagenes()
    },
    methods: {
        misimagenes(){
            this.user = JSON.parse(localStorage.getItem('user'))
            const token = localStorage.getItem('token')
            
            fetch('http://localhost:1337/imagenes/me', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then(data => {
                this.imagenes = data
                console.log(this.imagenes)
            })
        },
        eliminar(id){
            axios.delete('http://localhost:1337/imagenes/'+ id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                this.misimagenes()
            })
        }
    }
}
</script>

<template>
  <div class="row p-2  border-bottom " style="background-color:rgba(16, 182, 160,0.7)">
          <div class="col-5 align-self-center text-right" >
            
            <a target="_blank"><img alt="Sígueme en Facebook" href="URL" height="90" width="100" src="https://3.bp.blogspot.com/-9oNbCauNwds/XCrI4LDadeI/AAAAAAAAIBA/TknYHABL7oo-pKdMEVtYF1t454sDaA9AwCLcBGAs/s1600/xing.png" title="Sígueme en Facebook"/></a>
        </div>
        <div class="col-4">
          <font face = "Cooper Black" size = "6">Bienvenidos a tu pagina de imagenes</font>
        </div>
    <div class="col-3 align-self-center text-right" >
      <a class="btn btn-outline-primary" href="/Imagenes" role="button">Mis imagenes
      </a>&nbsp;
      <button @click="salir" class="btn btn-outline-danger">salir
      </button>
    </div>
  </div>

  <div class="row container">
    <center>
        <font face = "Cooper Black" size = "4">busca una imagen</font>
            <div class="input-group col-12 ">
              <input type="text" class="form-control bg-white text-dark" v-model="buscar" aria-label="Amount (to the nearest dollar)">
              <div class="input-group-prepend">
                <select class="input-group-text bg-white text-dark custom-select rounded-right" v-model="checkedNames">
                  <option class="text-dark" v-for="categoria in categorias" :key="categoria.id" :value="categoria.nombre" >{{ categoria.nombre }}</option>
                  <option class="text-dark" value=""  selected>Todas</option>
                </select>
              </div>
            </div>
            </center>

  </div>

  <div class="row justify-content-center">
    <div class="col-12 col-md-5 col-lg-3 m-2" v-for="imagen in imagenes" :key="imagen.id">
        <div class="card" style="width: 18rem;">
            <a :href="imagen.url.name" target="_blank"  download="image.jpg"><img :src="'http://localhost:1337'+ imagen.url.url" class="card-img-top"></a>
              <div class="card-body">
                <li type="disc">Publicada por: {{ imagen.user.username }}</li>
              </div>
        </div>
        <br>
    </div>
    
  </div>
  <div class="iconos-sociales"><center>
      <a  target="_blank"><img alt="Sígueme en Facebook" height="56" width="56" src="https://3.bp.blogspot.com/-rZLDbfQdt4A/XCrIyYkW_XI/AAAAAAAAH_c/65QvUQJnv-oFNFS_aA3IDS57L_QPZbWfQCLcBGAs/s1600/google-plus.png" title="Sígueme en Facebook"/></a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  target="_blank"><img alt="Sígueme en Facebook" height="56" width="56" src="https://3.bp.blogspot.com/-CmJ5WAZqDs4/XCrIx8_5MsI/AAAAAAAAH_Q/7eW-g_nxq0E1yZn72HLi5fd1jLVtOclVwCLcBGAs/s1600/facebook2.png" title="Sígueme en Facebook"/></a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  target="_blank"><img alt="Sígueme en Facebook" height="56" width="56" src="https://3.bp.blogspot.com/-E4jytrbmLbY/XCrI2Xd_hUI/AAAAAAAAIAo/qXt-bJg1UpMZmTjCJymxWEOGXWEQ2mv3ACLcBGAs/s1600/twitter.png" title="Sígueme en Facebook"/></a>
      </center>
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'debounce';

export default {
  name: 'Home',
  data(){
    return{
      imagenes: {},
      categorias: [],
      checkedNames: "",
      buscar: ""
    }
  },
  mounted(){
    axios.get('http://localhost:1337/imagenes?_sort=id:DESC').then((response) => {
      this.imagenes = response.data
      console.log(this.imagenes)
    }),
    axios.get('http://localhost:1337/categorias').then((response) => {
      this.categorias = response.data
    }),
    this.Search = debounce(this.Search, 600)
  },
  watch: {
    checkedNames(value){
      this.Search(value)
    },
    buscar(value){
      this.Search(value)
    }
  },
  methods: {
    Search(value){
      axios.get('http://localhost:1337/imagenes?_sort=id%3ADESC', {
        params: {
          'categorias.nombre_contains': value
        }
      }).then((response) => {
        this.imagenes = response.data
      })
    },
    salir(){
      localStorage.removeItem('token'),
      localStorage.removeItem('user'),
      this.$router.push('/login')
    }
  }
};
</script>


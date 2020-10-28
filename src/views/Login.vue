<template>

  <form @submit.prevent="login">
    <div class="row">
              <div  class="col-xl-6" style="background-color:rgba(16, 182, 160,0.9)" >
          <div class=" col-xl-12 py-xl-3 " >
            <p class="text-black-50" ></p>
                <center><a href="URL" target="_blank"><img alt="Sígueme en Facebook" height="90" width="100" src="https://3.bp.blogspot.com/-9oNbCauNwds/XCrI4LDadeI/AAAAAAAAIBA/TknYHABL7oo-pKdMEVtYF1t454sDaA9AwCLcBGAs/s1600/xing.png" title="Sígueme en Facebook"/></a></center>
                <br>
        </div>
        <div class=" col-xl-12 text-white text-center">
            <center><h1>BIENVENIDO A TU PAGINA DE IMAGENES</h1>
            <h6>Descubre un nuevo mundo</h6></center>
        </div>
        <div class=" col-xl-12 py-xl-4 text-white text-center">
          <center>
            <h1>diseños, clases y estilos</h1>
            
          </center>

        </div>
        <div class="col-xl-12 py-xl-4">
        </div>
        <div class="col-xl-12 py-xl-4">

        </div>
        </div>
      <div class="col-xl-6">
<center><h1>INICIAR SESION</h1> 
      <a href="/Registrarse" class="text-secondary text-info">Registrarse Aqui</a>
      <br>
      <label for="email">email </label><br>
      <input type="email" v-model="email" id="email" class="form-control" size=40 style="width:500px" placeholder="ejemplo@gmail.com">
      <br>
      <label for="password">contraseña </label><br>
      
      <input type="password" v-model="password" id="password" class="form-control" size=40 style="width:500px" placeholder="************"> <br>
      <button type="submit" class="btn mx-2 text-white btn-lg" style="background-color:rgb(16, 182, 160);">Iniciar sesión</button>
      
      </center><br>
              <div class="col-xl-12 py-xl-4">
                <center>
                  <div class="iconos-sociales">
                    <a  target="_blank"><img alt="Sígueme en Facebook" height="56" width="56" src="https://3.bp.blogspot.com/-rZLDbfQdt4A/XCrIyYkW_XI/AAAAAAAAH_c/65QvUQJnv-oFNFS_aA3IDS57L_QPZbWfQCLcBGAs/s1600/google-plus.png" title="Sígueme en Facebook"/></a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  target="_blank"><img alt="Sígueme en Facebook" height="56" width="56" src="https://3.bp.blogspot.com/-CmJ5WAZqDs4/XCrIx8_5MsI/AAAAAAAAH_Q/7eW-g_nxq0E1yZn72HLi5fd1jLVtOclVwCLcBGAs/s1600/facebook2.png" title="Sígueme en Facebook"/></a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  target="_blank"><img alt="Sígueme en Facebook" height="56" width="56" src="https://3.bp.blogspot.com/-E4jytrbmLbY/XCrI2Xd_hUI/AAAAAAAAIAo/qXt-bJg1UpMZmTjCJymxWEOGXWEQ2mv3ACLcBGAs/s1600/twitter.png" title="Sígueme en Facebook"/></a>
                    </div>
                    
                    

                  
                  
                </center>
            </div>
      
      </div>
      
    </div>

  </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return{
      email: "",
      password: "",
      error: false
    }
  },
  methods:{
    login() {
      this.error = false,

      fetch('http://localhost:1337/auth/local', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: this.email,
          password: this.password
        })
      }).then(async (response)=> {
        if(!response.ok){
          throw await response.json();
        }
        return response.json();
      }).then((data) => {
        localStorage.setItem('token', data.jwt),
        localStorage.setItem('user', JSON.stringify(data.user)),
        this.$router.push("/")
      })
      .catch((err)=> {
        this.error = true
      })
    }
  }
}
</script>

<style>.iconos-sociales img{border-radius:50px;}</style>

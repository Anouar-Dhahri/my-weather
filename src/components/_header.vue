<template>
    <header class="container">
        <nav class="menu">
            <img src="./../assets/logo.png" class="logo"/> <span class="appname">my weather</span>
        </nav>

    </header>
</template>

<script>
export default {

}
</script>

<style scoped>
    .container {
        width: 100%;
        height: 10rem;
        background-color:#222 ;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .menu {
        width: 80%;
        margin:auto;
        display: flex;
    }
    .logo {
        width:10rem;
    }
    .appname {
        text-transform: uppercase;
        font-size:4rem;
        line-height: 10rem;
        background-image:linear-gradient(315deg, #03e5b7 0%, #037ade 74%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        letter-spacing: 0.2rem;
    }

    @media screen and (max-width:70rem) {
        .logo {
            width:5rem;
            transition: all .2s;
        }
        .appname {
            font-size:2rem;
            transition: all .2s;
        }
    }
</style>
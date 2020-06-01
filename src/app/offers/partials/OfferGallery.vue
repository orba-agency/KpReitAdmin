<template>
    <div>Gallery</div>
</template>

<script>
export default {
    props: {
        galleries: [],
    },
    data() {
        return {}
    },
    methods: {
        getImgUrl(i) {
            console.log(i)
            return this.galleries[i].url
        },
    },
}
</script>

<style scoped>
.ant-carousel >>> .slick-dots {
    height: auto;
}
.ant-carousel >>> .slick-slide img {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    max-width: 80%;
}
.ant-carousel >>> .slick-thumb {
    bottom: -45px;
}
.ant-carousel >>> .slick-thumb li {
    width: 60px;
    height: 45px;
}
.ant-carousel >>> .slick-thumb li img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img {
    filter: grayscale(0%);
}
</style>

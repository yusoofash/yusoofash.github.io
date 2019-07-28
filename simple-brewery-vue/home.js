const BannerComponent = Vue.component('banner-component', {
    props: ['beerBanner'],
    template: `
    <div class="banner-home row py-4">
        <div class="col-md-4 d-flex justify-content-center py-3">
            <img v-bind:src="beerBanner.image_url" alt="banner">
        </div>
        <div class="banner-content col-md-8 py-3 d-flex flex-column justify-content-center">
            <h1 class="text-uppercase font-weight-bold">High quality beer...</h1>
            <h3>Cold & Delicious</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde ex itaque quidem ab eligendi
                hic?</p>
        </div>
    </div>
    `
});

const BeerListComponent = Vue.component('beer-list-component', {
    props: ['beerDetails'],
    template: `
    <div class="main-contents pb-3">
        <h3 class="main-content-title py-4">Wide Range Of Beers</h3>
        <div class="beer-product-container">
            <div class="beer-product p-4 center-all-v cursor-pointer" v-on:click="goToProductDetail(beer.id)"
                v-for="beer in beerDetails">
                <div>
                    <img v-bind:src="beer.image_url" alt="beer image">
                </div>
                <div class="pt-2 font-weight-bold text-uppercase">{{beer.name}}</div>
            </div>
        </div>
    </div>
    `,
    methods: {
        goToProductDetail(id) {
            this.$router.push({ path: `/detail/${id}` });
        }
    }
});

const HomeComponent = Vue.component('home-component', {
    template: `
    <div class="home-page">
        <banner-component
        v-if="beerBanner"
        v-bind:beerBanner="beerBanner"
        ></banner-component>

        <beer-list-component
        v-if="beerDetails"
        v-bind:beerDetails="beerDetails"
        ></beer-list-component>
    </div>
    `,
    data() {
        return {
            beerBanner: null,
            beerDetails: null
        }
    },
    methods: {
        getRandomBeer() {
            return fetch('https://api.punkapi.com/v2/beers/random')
                .then(res => res.json());
        },
        getBeerDetails() {
            return fetch('https://api.punkapi.com/v2/beers')
                .then(res => res.json());
        }
    },
    created() {
        Promise.all([this.getBeerDetails(), this.getRandomBeer()])
            .then(res => {
                this.beerDetails = res[0];
                this.beerBanner = res[1][0];
                console.log(JSON.parse(JSON.stringify(res)));
            })
    }
});
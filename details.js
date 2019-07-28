const BeerDetailComponent = Vue.component('test', {
    data() {
        return {
            beer: null
        }
    },
    template: `
    <div v-if="beer" class="row beer-detail-page">
        <div class="col-md-4 text-center py-3">
            <img v-bind:src="beer.image_url" class="img-fluid detail-pic"/>
        </div>
        <div class="col-md-8 py-3">
            <div class="pb-3 text-secondary">{{beer.tagline}}</div>
            <h2 class="font-weight-bold text-uppercase pb-3 my-3">{{beer.name}}</h2>
            <p class="text-justify">
                <strong>About the beer:</strong><br>
                {{beer.description}}
            </p>
            <div class="pb-3">
                <strong>Goes well with:</strong><br>
                <div>
                    {{beer.food_pairing.join(', ')}}
                </div>
            </div>
            <div>
                <strong>Ingredients:</strong><br>
                <div>
                    {{getIngredientsComma}}
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        getBeer() {
            return fetch(`https://api.punkapi.com/v2/beers/${this.$route.params.id}`)
                .then(res => res.json());
        }
    },
    computed: {
        getIngredientsComma() {
            return this.beer.ingredients.malt.map(val => val.name).join(', ');
        }
    },
    created() {
        this.getBeer().then(res => {
            this.beer = res[0];
            console.log(JSON.parse(JSON.stringify(this.beer)));
        });
    }
});
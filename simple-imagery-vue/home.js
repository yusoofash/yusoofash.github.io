const HomeComponent = Vue.component('home', {
    props: ['name'],
    template: `
    <div>
        <div v-if="memeArr" class="card-columns">
            <div class="d-inline-block m-1 image-block" v-for="meme of memeArr">
                <img class="img-fluid" v-bind:src="meme.url" alt="Meme Image">
                <p class="lead text-center text-white">{{meme.name}}</p>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            memeArr: null,
            originMemeArr: null
        }
    },
    methods: {
        getMemes() {
            return fetch('https://api.imgflip.com/get_memes')
                .then(res => res.json());
        }
    },
    created() {
        this.getMemes()
            .then(res => {
                this.originMemeArr = this.memeArr = res.data.memes.slice(0, 12);
            })
    },
    watch: {
        name(cur) {
            if (cur === undefined) this.memeArr = this.originMemeArr;

            else {
                this.memeArr = this.originMemeArr.filter(val => {
                    return val.name.toLowerCase().includes(cur.toLowerCase())
                });
            }

            console.log(cur);
        }
    }
});
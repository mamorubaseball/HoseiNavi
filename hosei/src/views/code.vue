<template>
    <v-container >
      <!-- <h2>Horizontal Card Scroll</h2>
      <div class="card-container">
        <v-row >
          <v-col v-for="(card, index) in cards" :key="index" cols="3">
            <v-hover>
                <template v-slot:default="{ hover }">
                    <v-card 
                
                :elevation="hover ? 24 : 6">
                  <v-img :src="card.image" />
                  <v-card-title>{{ card.title }}</v-card-title>
                  <v-card-text>{{ card.text }}</v-card-text>
                </v-card>
                </template>
            </v-hover>
          </v-col>
        </v-row>
      </div> -->

      <!-- <v-main>
        <v-row no-gutters>
          <v-col row="12" sm="6" md="4" v-for="(res,index) in cards" :key="index">
            <div :data-src = "index" v-intersect="onIntersect">
              <v-card class="card" :v-list="index">
                <v-img height="200" src="http://placekitten.com/300/200" alt=""></v-img>
                <v-card-title>{{ res.title }}</v-card-title>  
                <v-card-text>{{ res.text }}ページ</v-card-text>
                <infinite-loading @infinite="infiniteHandler"></infinite-loading>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-main> -->

<!-- 
      <v-list class="scroll-x">
    <v-card v-for="card in cards" :key="card" class="mx-3">
      <v-card-title>{{ card.title }}</v-card-title>
      <v-card-text>{{ card.text }}</v-card-text>
    </v-card>
  </v-list> -->
  <v-main>
    <div class="container">
  <h2>Scrolling Card UI With Flexbox</h2>
  <ul class="cards">
    <li v-for="card in cards" :key="card" class="card">
        <div>
        <h3 class="card-title">{{ card.title }}</h3>
        <div class="card-content">
          <p>{{ card.text }}</p>
        </div>
      </div>
      <div class="card-link-wrapper">
        <a href="" class="card-link">Learn More</a>
      </div>
    </li>
    
    <!-- <li class="card">
      <div>
        <h3 class="card-title">Service 2</h3>
        <div class="card-content">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab repudiandae magnam harum natus fuga et repellat in maiores.</p>
        </div>
      </div>
      <div class="card-link-wrapper">
        <a href="" class="card-link">Learn More</a>
      </div>
    </li> -->
  </ul>
</div>

</v-main>
</v-container>
  </template>
  
  <script>
  export default {
    name:"home2",
    data() {
      return {
        nowPage: 1,
        page: 0,
        firstPage:0,
        display: 12,
        cards: [
          {
            title: "Card 1",
            text: "Some text for card 1",
            image: "https://picsum.photos/id/237/200/300",
          },
          {
            title: "Card 2",
            text: "Some text for card 2",
            image: "https://picsum.photos/id/238/200/300",
          },
          {
            title: "Card 3",
            text: "Some text for card 3",
            image: "https://picsum.photos/id/239/200/300",
          },
          {
            title: "Card 4",
            text: "Some text for card 4",
            image: "https://picsum.photos/id/240/200/300",
          },
          {
            title: "Card 5",
            text: "Some text for card 5",
            image: "https://picsum.photos/id/241/200/300",
          },
          {
            title: "Card 6",
            text: "Some text for card 6",
            image: "https://picsum.photos/id/242/200/300",
          },
          {
            title: "Card 7",
            text: "Some text for card 7",
            image: "https://picsum.photos/id/243/200/300",
          },
        ],
      };
    },
    methods: {
        infiniteHandler($state) {
            
            var self = this;
            if (self.cards.length >= this.page) {    
                this.cards.slice(this.page,this.page + this.display).filter(function(item){
                    self.cards.push(item);
                    return item;
                });
                this.page += this.display;
                $state.loaded();
            } else {
                $state.complete();
            }
            
        },
        //ページの取得
        onIntersect (entries) {
            let res = {
                  'ratio' : entries[0].intersectionRatio > 0,
                  'dataSet': Number(entries[0].target.attributes['data-src'].value),
              }
 
            if(res.ratio && res.dataSet){
                //ページを算定
                let nowPage = Math.floor(res.dataSet / this.display) + 1 + this.firstPage

                //URLを取得
                let url_path = new URL(location.href);
                
                //1ページ以内ならpageを消す
                if(nowPage > 1){
                    url_path.searchParams.set("page", nowPage)
                }else{
                    url_path.searchParams.delete("page")
                }

                //WebApiに代入
                history.replaceState(null,null,url_path.toString());
                this.nowPage = nowPage
                 
            }
            /**/
           
        },
    }
  };
  </script>
  
  <style scoped>
  .card-container {
    display: flex;
    overflow-x: auto;
    padding: 16px;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }
  
  .card-container::-webkit-scrollbar {
    display: none;
  }

  .scroll-x {
  overflow-x: auto;
  white-space: nowrap;
}


/* スクロールに使ったCSS */
:root {
  --red: #ef233c;
  --darkred: #c00424;
  --platinum: #e5e5e5;
  --black: #2b2d42;
  --white: #fff;
  --thumb: #edf2f4;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font: 16px / 24px "Rubik", sans-serif;
  color: var(--black);
  background: var(--platinum);
  margin: 50px 0;
}

.container {
  max-width: 1400px;
  padding: 0 15px;
  margin: 0 auto;
}

h2 {
  font-size: 32px;
  margin-bottom: 1em;
}

.cards {
  display: flex;
  padding: 25px 0px;
  list-style: none;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

.card {
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  padding: 20px;
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 15%);
  scroll-snap-align: start;
  transition: all 0.2s;
}

.card:not(:last-child) {
  margin-right: 10px;
}

.card:hover {
  color: var(--white);
  background: var(--red);
}

.card .card-title {
  font-size: 20px;
}

.card .card-content {
  margin: 20px 0;
  max-width: 85%;
}

.card .card-link-wrapper {
  margin-top: auto;
}

.card .card-link {
  display: inline-block;
  text-decoration: none;
  color: white;
  background: var(--red);
  padding: 6px 12px;
  border-radius: 8px;
  transition: background 0.2s;
}

.card:hover .card-link {
  background: var(--darkred);
}

.cards::-webkit-scrollbar {
  height: 12px;
}

.cards::-webkit-scrollbar-thumb,
.cards::-webkit-scrollbar-track {
  border-radius: 92px;
}

.cards::-webkit-scrollbar-thumb {
  background: var(--darkred);
}

.cards::-webkit-scrollbar-track {
  background: var(--thumb);
}

@media (min-width: 500px) {
  .card {
    flex-basis: calc(50% - 10px);
  }

  .card:not(:last-child) {
    margin-right: 20px;
  }
}

@media (min-width: 700px) {
  .card {
    flex-basis: calc(calc(100% / 3) - 20px);
  }

  .card:not(:last-child) {
    margin-right: 30px;
  }
}

@media (min-width: 1100px) {
  .card {
    flex-basis: calc(25% - 30px);
  }

  .card:not(:last-child) {
    margin-right: 40px;
  }
}


/* FOOTER STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.page-footer {
  position: fixed;
  right: 0;
  bottom: 50px;
  display: flex;
  align-items: center;
  padding: 5px;
  z-index: 1;
}

.page-footer a {
  display: flex;
  margin-left: 4px;
}

  </style>
  
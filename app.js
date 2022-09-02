
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')

const app  = {
    songs:  [
        {
            name : 'Em không lẻ loi',
            singer : 'Justaate',
            path : './assets/song (1).mp3',
            image : './asstets/img/song (1).jpg'
    
        },
    
        {
            name : 'Leyla',
            singer : 'unknow singer',
            path : './assets/song (2).mp3',
            image : './asstets/img/song (2).jpg'
    
        },
    
        {
            name : 'Nơi này có anh',
            singer : 'Sơn Tùng MTP',
            path : './assets/song (3).mp3',
            image : './asstets/img/song (3).jpg'
    
        },
    
        {
            name : 'Muộn rồi mà sao còn',
            singer : 'Sơn Tùng MTP',
            path : './assets/song (4).mp3',
            image : './asstets/img/song (4).jpg'
    
        },
    
        {
            name : 'Thằng Điên',
            singer : 'Justaate',
            path : './assets/song (5).mp3',
            image : './asstets/img/song (5).jpg'
    
        },
    
        {
            name : 'Bad Habits',
            singer : 'Ed sheeran',
            path : './assets/song (6).mp3',
            image : './asstets/img/song (6).jpg'
    
        },
    
        {
            name : 'Lego House',
            singer : 'Ed Sheeran',
            path : './assets/song (7).mp3',
            image : './asstets/img/song (7).jpg'
    
        },
    
        {
            name : 'Trời hôm nay nhiều mây cực',
            singer : 'Đen Vâu',
            path : './assets/song (8).mp3',
            image : './asstets/img/song (8).jpg'
    
        },
    
        {
            name : 'Overpass Graffiti',
            singer : 'Ed Sheeran',
            path : './assets/song (9).mp3',
            image : './asstets/img/song (9).jpg'
    
        },
    
        {
            name : 'Shape Of You',
            singer : 'Ed Sheeran',
            path : './assets/song (10).mp3',
            image : './asstets/img/song (10).jpg'
    
        }
    ],

    render : function(){
        const htmls = this.songs.map(function(song){
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    
    handelEvents : function(){
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth

        document.onscroll = function(){
            
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth/cdWidth
            
        }

    },

    start : function(){
        this.handelEvents()
        this.render()
    }


}

app.start()
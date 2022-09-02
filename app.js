
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')


const cd = $('.cd')
const playBtn = $('.btn-toggle-play')

const cdThumb = $('.cd-thumb')
const heading = $('header h2')
const audio = $('#audio')

const player = $('.player')

const progress = $('.progress')

const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')

const randomBtn = $('.btn-random')


const app  = {
    currentIndex :  0,
    isPlaying : false,
    isRandom : false,
    songs:  [
        
        {
            name : 'Love Dive',
            singer : 'IVE',
            path : './asstets/music/song (11).mp3',
            image : './asstets/img/song (11).jpg'
    
        },
        {
            name : 'Em không lẻ loi',
            singer : 'Justaate',
            path : './asstets/music/song (1).mp3',
            image : './asstets/img/song (1).jpg'
    
        },
    
        {
            name : 'Leyla',
            singer : 'unknow singer',
            path : './asstets/music/song (2).mp3',
            image : './asstets/img/song (2).jpg'
    
        },
    
        {
            name : 'Nơi này có anh',
            singer : 'Sơn Tùng MTP',
            path : './asstets/music/song (3).mp3',
            image : './asstets/img/song (3).jpg'
    
        },
    
        {
            name : 'Muộn rồi mà sao còn',
            singer : 'Sơn Tùng MTP',
            path : './asstets/music/song (4).mp3',
            image : './asstets/img/song (4).jpg'
    
        },
    
        {
            name : 'Thằng Điên',
            singer : 'Justaate',
            path : './asstets/music/song (5).mp3',
            image : './asstets/img/song (5).jpg'
    
        },
    
        {
            name : 'Bad Habits',
            singer : 'Ed sheeran',
            path : './asstets/music/song (6).mp3',
            image : './asstets/img/song (6).jpg'
    
        },
    
        {
            name : 'Lego House',
            singer : 'Ed Sheeran',
            path : './asstets/music/song (7).mp3',
            image : './asstets/img/song (7).jpg'
    
        },
    
        {
            name : 'Trời hôm nay nhiều mây cực',
            singer : 'Đen Vâu',
            path : './asstets/music/song (8).mp3',
            image : './asstets/img/song (8).jpg'
    
        },
    
        {
            name : 'Overpass Graffiti',
            singer : 'Ed Sheeran',
            path : './asstets/music/song (9).mp3',
            image : './asstets/img/song (9).jpg'
    
        },
    
        {
            name : 'Shape Of You',
            singer : 'Ed Sheeran',
            path : './asstets/music/song (10).mp3',
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
    defineProperties : function(){
        Object.defineProperty(this, 'currentSong', {
            get : function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    handelEvents : function(){
        const cdWidth = cd.offsetWidth
        const _this = this
        //Xử Lý khi click button Play 
        playBtn.onclick = function(){
            if(_this.isPlaying) {
                audio.pause()  
            } else {
                audio.play()  
            }
        }

        
        //Nút đang play
        audio.onplay = function(){
            player.classList.add('playing')   
            _this.isPlaying = true
            cdThumbAnimate.play()
        }

        //Nút đang pause
        audio.onpause = function(){
            player.classList.remove('playing')   
            _this.isPlaying = false           
            cdThumbAnimate.pause()
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration*100)
                progress.value = progressPercent
            }
        },

        progress.oninput = function(e){
            if (audio.duration){
                const timeSeek = audio.duration / 100* e.target.value 
                audio.currentTime = timeSeek 
            }
        }


        
        //Xử lý cd quay và dừng
        const cdThumbAnimate= cdThumb.animate([
            {transform :'rotate(360deg)' }

        ], {
            duration: 10000,
            iterations: Infinity 
        })

        cdThumbAnimate.pause()

        //Sử lý phóng to thu nhỏ cd
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const cdNewWidth = cdWidth - scrollTop

            cd.style.width = cdNewWidth > 0 ? cdNewWidth + 'px' : 0
            cd.style.opacity = cdNewWidth/cdWidth
        }

        
        //Khi next bài hát
        nextBtn.onclick = function(){
            _this.nextSong()
            audio.play()
        }

        //Khi prev bài hát
        prevBtn.onclick = function(){
            _this.prevSong()
            audio.play()
        }

        //Khi nhấn vào nút random
        randomBtn.onclick = function(){
            randomBtn.classList.toggle('active', _this.isRandom)
            _this.isRandom = !_this.isRandom
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name,
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    nextSong : function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    
    prevSong : function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    
    



    start : function(){
        this.defineProperties()

        this.handelEvents()

        this.loadCurrentSong()

        this.render()
    }


}

app.start()
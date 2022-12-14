
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')

const PLAYER_STORAGE_KEY = 'F8_PLAYER'


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

const repeatBtn = $('.btn-repeat')

//Volume
const volume          = $('.volume')
const volumeUp        = $('.volume-up')
const volumeDown      = $('.volume-down')
const volumeViewPercent   = $('.volume-percent')


const app  = {
    maxVolume: 100,    
    currentVolume: 100,
    currentIndex :  0,
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    config : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs :  [
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
    setconfig : function(key,value){
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render : function(){
        const htmls = this.songs.map(function(song, index){
            return `
                <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index = "${index}">
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

        nextBtn.onclick = 
 
        //Khi next bài hát
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //Khi prev bài hát
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //Khi nhấn vào nút random
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom
            _this.setconfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //Xử lý khi bấm vào nút repeatBtn 
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat
            _this.setconfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        } 


        //Xử lý nextSong khi audio ended
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play();
            } else {
                nextBtn.click();
            }

        }

        //Lắng nghe hành vi click vào bài hát
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option') ){
                //Xử lý click vào song
                if(songNode){
                    _this.currentIndex = Number(songNode.getAttribute('data-index'))
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                //Xử lý click vào option
            }
        }

        //Volume
        volumeDown.onmousedown = function() {
            if (_this.currentVolume > 0) {
                _this.currentVolume --
                _this.changeVolume(_this.currentVolume)
                volume.value = _this.currentVolume
            }
        }
        volumeUp.onmousedown = function() {
            if (_this.currentVolume < 100) {
                _this.currentVolume ++
                _this.changeVolume(_this.currentVolume)
                volume.value = _this.currentVolume
            }
        }
        volume.onchange = function() {
            _this.currentVolume = volume.value
            _this.changeVolume(_this.currentVolume)
            volume.value = _this.currentVolume
        }
        
    },

    //Volume
    changeVolume: function(index) {        
        volumeViewPercent.textContent = 'Volume '+ index + '%'
        audio.volume = index/100       
    },

    scrollToActiveSong : function(){
        setTimeout(function(){
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }, 500)
    },

    loadConfig : function(){
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;

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

    playRandomSong : function(){
        let newIndex 
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        }
        while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start : function(){

        //Gán cấu hình từ config vào app
        this.loadConfig()

        //Định Nghĩa Method Object
        this.defineProperties()

        //Hàm xử lý sự kiến DOM
        this.handelEvents()

        //Hàm tải bài hát
        this.loadCurrentSong()

        //Hàm render lên trên web
        this.render()

        
        //Hiển thị trạng thái ban đầu của repeat và random
        repeatBtn.classList.toggle('active', this.isRepeat)
        randomBtn.classList.toggle('active', this.isRandom)
    }


}

app.start()
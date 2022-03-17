<template>
    <div class="z-0 mt-3 flex justify-center max-w-full bg-gray-200">
        <div class="w-full max-w-screen-xl my-5">
            <div class="md:w-1/2 w-full float-left text-center md:text-left">
                <div class="flex justify-center md:block">
                    <img class="h-40 object-contain" src="/images/logo.png"/>
                </div>
                
                <div class="text-center md:text-left">
                    <h3 class="text-xl font-bold">CÔNG TY TNHH MAICOGROUP</h3>
                    <div class="mt-2 md:mt-0">
                        <svg class="md:block hidden float-left" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#32c82b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        <span class="ml-1">MST: 340 114 6883 -  Do sở KHĐT TP.HCM cấp ngày 19/08/2021</span>
                    </div>
                    <div class="mt-2 md:mt-0">
                        <svg class="md:block hidden float-left" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#32c82b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span class="ml-1">Số 2 đường 13, <span id="disable-tracking">Khu</span> đô thị Vạn Phúc, Hiệp Bình Phước, TP. Thủ Đức, TP. HCM</span>
                    </div>
                    <div class="mt-2 md:mt-0">
                        <svg class="md:block hidden float-left" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#32c82b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        <span class="ml-1">
                            <a href="tel:0961677167">096 1677 167</a> - <a href="tel:0961960196">096 196 0196</a>
                        </span>
                    </div>
                </div>
                <div class="mt-2">
                    <h3 class="text-xl font-bold">Theo dõi chúng tôi</h3>
                    <div id="follow-group" class="flex justify-center md:justify-start"> 
                        <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#32c82b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#32c82b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                    </div>
                </div>
            </div>
            <div class="w-1/4 float-left md:block hidden">
                <div>
                    <h3 class="text-xl font-bold mb-2">Công ty</h3>    
                    <p>Chào mừng đến với Maico</p>
                    <p>Tuyển dụng</p>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-2 mt-3">Dịch vụ</h3>
                    <p>Mua/bán bất động sản</p>
                    <p>Thuê/cho thuê bất động sản</p>
                    <p>Tài chính bất động sản</p>
                    <p>Pháp lí bất động sản</p>
                    <p>Công nghệ bất động sản</p>
                </div>
            </div>
            <div class="w-1/4 float-left md:block hidden">
                <div>
                    <h3 class="text-xl font-bold mb-2">Tài nguyên Maico</h3>    
                    <p>Blog</p>
                    <p>Trung tâm hỗ trợ</p>
                    <p>Dành cho môi giới</p>
                    <p>Về thuê/cho thuê bất động sản</p>
                    <p>Về mua/bán bất động sản</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "MainFooter",
    mounted(){
        if(process.client){
        const logoEle = document.getElementById('disable-tracking');

        logoEle.addEventListener('click', this.disableCookies);
        }
    },
    methods:{
        disableCookies(evt){
            if (evt.detail === 1) {
                    this.$cookies.set('trackingState','disabled',{
                    path: '/',
                    maxAge: 60 * 60 * 24 * 365
                    });
                    alert('Đã tắt tracking');
                }
            },
    }
}
</script>
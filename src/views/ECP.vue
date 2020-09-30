<template>
    <div class="ecp">
        <select id="certList" v-model="selected">
            <option v-for="(item, index) in this.certificates" :key="index" :value="item.thumbprint">{{item.name}}</option>
        </select>
    <button id="createSign" @click="createSign" type="button">Создать подпись</button>
    <button id="showCertificate" type="button">Информация о сертификате</button>
    <br>
    <pre id="certificateInfo"></pre>
    <textarea id="createdSign" v-model="ecp" cols="100" rows="30"></textarea>
    <pre id="errorMessage"></pre>
    <pre id="systemInfo"></pre>
    {{certificates}}
    {{ecp}}
    </div>
</template>

<script>
import { getUserCertificates, Certificate, createSignature } from 'crypto-pro';
export default {
    name: 'EXP',
    created() {
        this.test()
    },
    data() {
        return {
            selected: null,
            ecp: '',
            certificates: []
        }
    },
    methods: {
        async test() {
            this.certificates = Certificate;
            try {
                this.certificates = await getUserCertificates();
                console.log(this.certificates)
            } catch(error) {
                console.log("ошибка сертификата - ", error)
            }
        },
        async createSign() {
            let hash = 'b285056dbf18d7392d7677369524dd14747459ed8143997e163b2986f92fd42c',
            hashBase64 = window.btoa(hash),
            thumbprint = this.selected;
            await createSignature(thumbprint, hashBase64).then(function(signature) {
                this.ecp = signature
            })
        }
    }
}
</script>
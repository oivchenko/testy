import Vue from 'vue';
import {Component,Prop,Watch,Provide, Inject} from "vue-property-decorator";
import Axios,{ AxiosStatic, AxiosRequestConfig} from "axios";

import  {Testes,TestRecord,Question,Answer,TestState} from "../models";
import {ListCources,TestStart,TestDoing,TestResults} from "../components";



@Component({

components:{ ListCources, TestStart, TestDoing,TestResults },

data()
{
    return {
                TState: ((this as App).teststate as TestState)
            }
},



methods:{},


async created() 
{
    let _url:string="/data/Tests.json";
    var tt=await Axios.get(_url);
    this.testes.TestesList=tt.data;
}




})
export default  class App  extends  Vue
{

    @Inject() testes:Testes;
    @Inject() teststate:TestState;



    public get ComponentName() : string 
    {
        return this.teststate.CurrentComponent;
    }

    

}
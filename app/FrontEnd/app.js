let url="http://localhost:8080";
app=new Vue({
    el:'#app',
    data(){
        return {title:'0',title1:'0',resultArr:[0],
        resultArr1:[0],oper:'',openteEred:false,anotherEntered:false,
        equEntered:false,
        exData:{
            first:0.0,
            second:0.0,
            op:''
        },
        }},
    methods: {
        countNums:function(){
            let i=(this.resultArr[0]==0||
                ((this.resultArr[0]==0)&&(this.resultArr[1]=='-')))?-1:0;
            let flag=false;
            this.resultArr.forEach(element => {
                if(element=='e'){flag=true;}
                if(flag||element=='-'||element=='.'){i--;}
                i++;
            });
            return i;
        },
        show:function (){
         this.title=this.resultArr.join('');},
        showLittle:function(ope){
            this.title1=this.resultArr1.join('')+ope;},
        addNum:function (num){
            if(this.title==='Infinity'||this.equEntered){this.clr(true);}
                if(this.opeEntered||this.anotherEntered){this.resultArr=[0]
                this.opeEntered=false;
                this.anotherEntered=false;}
                if(this.resultArr[0]==0&&this.resultArr[1]!='.'){this.resultArr[0]=num;}
                else if(this.countNums()<16){
                    this.resultArr.push(num);
                }
                this.show();
        },
        addPoint:function(){
            if(this.title==='Infinity'||this.equEntered){this.clr(true);
            if(this.equEntered){this.equEntered=false;}}
            if(this.opeEntered||this.anotherEntered){this.resultArr=[0];
            this.opeEntered=false;
            this.anotherEntered=false;}
         if(!this.resultArr.includes('.')){this.resultArr.push('.')}
         this.show();},
         clr: function (bln){
             if(bln){
             this.resultArr=[0];
             this.resultArr1=[0];
             this.equEntered=false;
             this.opeEntered=false;
             this.anotherEntered=false;
             this.oper='';
             this.exData.first=0.0;
             this.exData.second=0.0;
             this.exData.op='';
             this.showLittle('');}
             else if(!bln&&this.title==='Infinity'){this.clr(true);}
             else if(!bln&&!this.opeEntered&&!this.equEntered)
                {if(this.resultArr[0]=='-'&&((this.resultArr.length<4 
                    && this.resultArr.join('')=='-0.')||(this.resultArr.length<3)))
                    {this.resultArr=[0];}
                else if(this.resultArr.length==1)
                {this.resultArr[0]=0;}
                 else if(this.resultArr.length>1){
                     this.resultArr.pop();
                 }}
         this.show();},
         setOp:function (operation){
            if(this.title==='Infinity'){this.clr(true);}
            else{
            this.equEntered=false;
            if((this.oper!=''&&(!this.opeEntered))){
                if(parseFloat(this.resultArr.join(''))==0&&(this.oper=='/')){
                    alert('divide by zero!');
                    this.clr(true);
                }
                else{
                this.exData.first=this.resultArr1.join('');
                this.exData.op=this.title1.charAt(this.title1.length-1);
                this.exData.second=this.resultArr.join('');  
                this.calcol(this.exData,true,operation);
                this.opeEntered=true;
                this.oper=operation;}}
            else{
                this.opeEntered=true;
                this.oper=operation;
                this.resultArr1=this.resultArr;
                this.show();
                this.showLittle(operation);
            }
        }},
        sqr:function(){
            if(this.title!='Infinity'){
            this.opeEntered=false;
            this.exData.first=this.resultArr.join('');
            this.exData.second=this.resultArr.join('');
            this.exData.op='*';
            this.calcol(this.exData,false);
            }
        },
        negPos:function(){
            if(this.title==='Infinity'){this.clr(true);}
            else{
            this.opeEntered=false;
            this.exData.first=this.resultArr.join('');
            this.exData.second='-1';
            this.exData.op='*';
            this.calcol(this.exData,false);}
        },
        sqrt:function(){
            if(this.title!='Infinity'){
            if(parseFloat(this.resultArr.join(''))<0){
                this.clr(true);
                alert("root to negative number!");
            }
            else{
            this.opeEntered=false;
            this.exData.first=this.resultArr.join('');
            this.exData.second='0';
            this.exData.op='√';
            this.calcol(this.exData,false);}}
        },
        rev:function (){
            if(parseFloat(this.resultArr.join(''))==0){
                this.clr(true);
                alert("dividing by zero");
            }
            else{
            this.opeEntered=false;
            this.exData.first='1';
            this.exData.second=this.resultArr.join('');
            this.exData.op='/';
            this.calcol(this.exData,false);}
        },
        percent: function (){
            this.opeEntered=false;
            this.exData.first=this.resultArr.join('');
            this.exData.second='100';
            this.exData.op='/';
            this.calcol(this.exData,false);
        },
        equl:function (){
            if(this.title==='Infinity'){this.clr(true);}
            else{
                this.anotherEntered=false;
                if(this.oper==='/'&&parseFloat(this.resultArr.join(''))==0){
            alert("dividing by zero");
             this.clr(true);}
            else{
            this.equEntered=true;
            this.opeEntered=false;
            if(this.oper!=''){
                this.exData.first=this.resultArr1.join('');
                this.exData.second=this.resultArr.join('');
                this.exData.op=this.oper;
                this.calcol(this.exData,true,'');}
                else{
                    this.resultArr1=this.resultArr;
                    this.show();
                    this.showLittle('');}
            this.oper='';}
        }},
        calcol:function (dat,flag,opr){
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dat),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            fetch(url).then(
              response => { return response.json(); }).then(
                  data =>{
                      this.title=data;
                      this.resultArr=data.toString().split('');
                      if(flag){
                        this.resultArr1=data.toString().split('');
                        this.showLittle(opr);
                      }
                    });})
          .catch((error) => {
            console.error('Error:', error);
          });
        },
        },
    mounted(){
        fetch(url).then(
            response => { return response.json(); }).then(
                data =>{this.title=data;});}}
)
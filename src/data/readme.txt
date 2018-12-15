

https://next.json-generator.com/V17rjWUkU





=====================================================

[
  {
   'repeat(10)':{
     id: '{{index(1)}}',
     title(tags){ return `Test ${this.id}. ${tags.lorem(2, "words")}`; } ,
     exec_time_min:'{{integer(10,50)}}',
     
     questions:[
       {
         'repeat(5,10)':
         {
           id:'{{index(1)}}',
           question: '{{lorem(3, "words")}} ?',

           
           answers:[
           {
           	'repeat(3,5)':
           	{
              id:'{{index(1)}}',
           	  answer: '{{lorem(3, "words")}} '
           	}
            }],
           
         	good_answ(tags) { return tags.random(...this.answers).id; }
           
         }
       }
       ]
     
   }
   }
]
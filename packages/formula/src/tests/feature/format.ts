import { TestCaseInterface } from '../testType'

export const FormatTestCase: TestCaseInterface = {
  name: 'format',
  testCases: {
    pages: [],
    formatTestCases: [
      { definition$: '=$', label: 'emtpy ok' },
      { definition$: '=12a112$3', label: 'invalid ok' },
      { definition$: '=1 $ 3', label: 'invalid ok 2' },
      { definition$: '=($)' },
      { definition$: '=[]$' },
      { definition$: '=${}' },
      { definition$: '= -2.1$23%', minifyResult$: '=-2.1$23%', formatResult$: '=-2.1$23%' },
      { definition$: '=[1$]', formatResult$: '=[ 1 $]' },
      { definition$: '={a$: 1}', minifyResult$: '={a$:1}', formatResult$: '={ a$:1 }' },
      { definition$: '=-1$2.123%' },
      { definition$: '=ABS(1,num0$,3)', formatResult$: '=ABS( 1, num0$, 3 )' },
      { definition$: '= 1\n + 3$', minifyResult$: '=1+3$', formatResult$: '=1 + 3$' },
      { definition$: '= 1\n + $3', minifyResult$: '=1+$3', formatResult$: '=1 + $3' },
      { definition$: '= 1\n + 3$3', minifyResult$: '=1+3$3', formatResult$: '=1 + 3$3' },
      { definition$: '= 1\n$ + 3', minifyResult$: '=1$+3', formatResult$: '=1 $+ 3' },
      { definition$: '= ( 1\n +   $   3 )', minifyResult$: '=(1+$3)', formatResult$: '=( 1 + $3 )' },
      { definition$: '= ( 1\n +     3$ )', minifyResult$: '=(1+3$)', formatResult$: '=( 1 + 3 $)' },
      { definition$: '= -2 - 1   $', minifyResult$: '=-2-1$', formatResult$: '=-2 - 1$' },
      { definition$: '= 2 * $1', minifyResult$: '=2*$1', formatResult$: '=2 * $1' },
      { definition$: '= 2 / $1', minifyResult$: '=2/$1', formatResult$: '=2 / $1' },
      { definition$: '= 2 ^ $1', minifyResult$: '=2^$1', formatResult$: '=2 ^ $1' },
      { definition$: '= " 2 " & " $ 1"', minifyResult$: '=" 2 "&" $ 1"', formatResult$: '=" 2 " & " $ 1"' },
      { definition$: '= 1 = 2$', minifyResult$: '=1=2$', formatResult$: '=1 = 2$' },
      { definition$: '= 1 <> 2$', minifyResult$: '=1<>2$', formatResult$: '=1 <> 2$' },
      { definition$: '= 1 < 2$', minifyResult$: '=1<2$', formatResult$: '=1 < 2$' },
      { definition$: '= 1 > 2$', minifyResult$: '=1>2$', formatResult$: '=1 > 2$' },
      { definition$: '= 1 <= 2$', minifyResult$: '=1<=2$', formatResult$: '=1 <= 2$' },
      { definition$: '= 1 >= 2$', minifyResult$: '=1>=2$', formatResult$: '=1 >= 2$' },
      { definition$: '= 1 == 2$', minifyResult$: '=1==2$', formatResult$: '=1 == 2$' },
      { definition$: '= 1 != 2$', minifyResult$: '=1!=2$', formatResult$: '=1 != 2$' },
      { definition$: '= 1 && 2$', minifyResult$: '=1&&2$', formatResult$: '=1 && 2$' },
      { definition$: '= 1 || 2$', minifyResult$: '=1||2$', formatResult$: '=1 || 2$' },
      {
        definition$: '= 1  and 2$',
        minifyResult$: '=1and2$',
        formatResult$: '=1 and 2$',
        todoMessage: 'fix 1and2 parse'
      },
      { definition$: '= 1  or 2$', minifyResult$: '=1or2$', formatResult$: '=1 or 2$' },
      { definition$: '=  !  2$', minifyResult$: '=!2$', formatResult$: '=!2$' },
      { definition$: '=  not  2$', minifyResult$: '=not2$', formatResult$: '=not 2$' },
      { definition$: '= 1  in  2$', minifyResult$: '=1in2$', formatResult$: '=1 in 2$' },
      { definition$: '=( 1 + 2 =$= 3 AND 4 )', minifyResult$: '=(1+2=$=3AND4)' },
      { definition$: '=[1,2,1$+1]', formatResult$: '=[ 1, 2, 1 $+ 1 ]' },
      { definition$: '=123;$123', formatResult$: '=123;\n$123' },
      { definition$: '=1+$', formatResult$: '=1 +$' },
      { definition$: '=[1,$2', formatResult$: '=[ 1, $2' },
      { definition$: '=,,$,', todoMessage: 'comma parse' },
      { definition$: '=;;$;', formatResult$: '=;;$;' }
    ]
  }
}

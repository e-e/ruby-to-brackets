```ts
import { rubyToBrackets } from 'ruby-to-brackets';

const ruby = `これは<ruby>文章<rt>ぶんしょう</rt></ruby>だ。`;
const brackets = rubyToBrackets(ruby); // これは文章[ぶんしょう]だ。
```
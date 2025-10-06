# 字符串格式化工具函数

Strap-Trousers 提供了字符串格式转换相关的工具函数。

## formatString - 字符串格式转换

用于字符串的字符映射转换，主要用于加密/解密过程中的字符处理。

```javascript
import { formatString } from 'strap-trousers'

const result = formatString('a')
console.log(result) // 输出: ZZ

const result2 = formatString('ZZ')
console.log(result2) // 输出: a
```

### 字符映射规则

函数定义了一套完整的字符映射规则：

#### 小写字母映射
```
a -> ZZ, b -> YY, c -> XX, d -> WW, e -> VV,
f -> UU, g -> TT, h -> SS, i -> RR, j -> QQ,
k -> PP, l -> OO, m -> NN, n -> MM, o -> LL,
p -> KK, q -> JJ, r -> II, s -> HH, t -> GG,
u -> FF, v -> EE, w -> DD, x -> CC, y -> BB, z -> AA
```

#### 大写字母映射
```
A -> zz, B -> yy, C -> xx, D -> ww, E -> vv,
F -> uu, G -> tt, H -> ss, I -> rr, J -> qq,
K -> pp, L -> oo, M -> nn, N -> mm, O -> ll,
P -> kk, Q -> jj, R -> ii, S -> hh, T -> gg,
U -> ff, V -> ee, W -> dd, X -> cc, Y -> bb, Z -> aa
```

#### 反向映射
```
ZZ -> a, YY -> b, XX -> c, WW -> d, VV -> e,
UU -> f, TT -> g, SS -> h, RR -> i, QQ -> j,
PP -> k, OO -> l, NN -> m, MM -> n, LL -> o,
KK -> p, JJ -> q, II -> r, HH -> s, GG -> t,
FF -> u, EE -> v, DD -> w, CC -> x, BB -> y, AA -> z

zz -> A, yy -> B, xx -> C, ww -> D, vv -> E,
uu -> F, tt -> G, ss -> H, rr -> I, qq -> J,
pp -> K, oo -> L, nn -> M, mm -> N, ll -> O,
kk -> P, jj -> Q, ii -> R, hh -> S, gg -> T,
ff -> U, ee -> V, dd -> W, cc -> X, bb -> Y, aa -> Z
```

### 使用场景

#### 加密/解密过程

`formatString` 函数主要用于 `encryption` 和 `decrypt` 函数中的字符转换：

```javascript
// 在加密过程中
const encrypted = encryption('hello')
// 内部会调用 formatString 进行字符映射

// 在解密过程中  
const decrypted = decrypt(encrypted)
// 内部会调用 formatString 进行反向映射
```

#### 自定义字符转换

```javascript
function customEncode(text) {
  return text.split('').map(char => {
    const mapped = formatString(char)
    return mapped || char // 如果没有映射则保持原字符
  }).join('')
}

function customDecode(text) {
  // 需要实现更复杂的逻辑来处理双字符映射
  return text
}
```

### 注意事项

1. **单字符处理**：`formatString` 函数只处理单个字符的映射
2. **双向映射**：映射规则是双向的，可以正向也可以反向转换
3. **特殊字符**：对于没有映射规则的字符，函数返回 `undefined`
4. **依赖关系**：这个函数是 `encryption` 和 `decrypt` 函数的基础

### 相关函数

- [encryption](/guide/utils/data) - 数据加密函数，使用 `formatString` 进行字符转换
- [decrypt](/guide/utils/data) - 数据解密函数，使用 `formatString` 进行反向转换
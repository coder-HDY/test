# バリデーションツール — API ドキュメント

クライアント入力の検証を行うユーティリティ関数群です。安全で堅牢なバリデーションルールを提供します。

---

## validateEmail

**概要**：電子メールアドレスのフォーマットを RFC 5322 標準に基づいて検証します。

**シグネチャ**
```js
validateEmail(email)
```

**パラメータ**

| パラメータ名 | 型 | 必須 | 説明 |
|---|---|---|---|
| email | string | ✅ | 検証するメールアドレス |

**戻り値**

| 型 | 説明 |
|---|---|
| boolean | フォーマットが有効な場合は `true`、無効な場合は `false` |

**検証ルール**

- `@` 記号が必須
- ユーザー名部分（@ 前）が必須
- ドメイン名が必須
- トップレベルドメイン（例：.com）が必須
- スペースは不可
- サポート: ドット、プラス記号、アンダースコア

**使用例**

```js
validateEmail('user@example.com');        // true
validateEmail('user+tag@example.co.uk');  // true
validateEmail('invalid-email');            // false
validateEmail('@example.com');             // false
```

**エラー**

| 条件 | エラーメッセージ |
|---|---|
| 文字列以外の型 | `Email must be a string` |

---

## validateUsername

**概要**：ユーザー名の形式を検証します。英文字、数字、アンダースコアのみで、3～20 字の長さを要求します。

**シグネチャ**
```js
validateUsername(username)
```

**パラメータ**

| パラメータ名 | 型 | 必須 | 説明 |
|---|---|---|---|
| username | string | ✅ | 検証するユーザー名 |

**戻り値**

| 型 | 説明 |
|---|---|
| boolean | 形式が有効な場合は `true`、無効な場合は `false` |

**検証ルール**

- 許可文字: 英文字（a-z, A-Z）、数字（0-9）、アンダースコア（_）
- 最小長: 3 字
- 最大長: 20 字
- スペースは不可
- 特殊文字は不可
- 非 ASCII 文字（中文など）は不可

**使用例**

```js
validateUsername('user_123');       // true
validateUsername('abc');            // true（最小 3 字）
validateUsername('valid_user_name');// true
validateUsername('ab');             // false（3 字未満）
validateUsername('user@name');      // false（特殊文字含む）
validateUsername('用户名');         // false（非 ASCII）
```

**エラー**

| 条件 | エラーメッセージ |
|---|---|
| 文字列以外の型 | `Username must be a string` |

---

## validatePassword

**概要**：パスワード強度を検証します。大文字、小文字、数字、特殊文字を含む 8 字以上を要求します。

**シグネチャ**
```js
validatePassword(password)
```

**パラメータ**

| パラメータ名 | 型 | 必須 | 説明 |
|---|---|---|---|
| password | string | ✅ | 検証するパスワード |

**戻り値**

| 型 | 説明 |
|---|---|
| boolean | 強度要件を満たす場合は `true`、不満の場合は `false` |

**検証ルール**

- 最小長: 8 字
- 大文字: 最低 1 字含む必須（A-Z）
- 小文字: 最低 1 字含む必須（a-z）
- 数字: 最低 1 字含む必須（0-9）
- 特殊文字: 最低 1 字含む必須（!@#$%^&*() など）

**許可される特殊文字**

```
! @ # $ % ^ & * ( ) _ + - = [ ] { } ; ' : " \ | , . < > / ?
```

**使用例**

```js
validatePassword('MyPassword123!');  // true
validatePassword('Pass@word#123');   // true
validatePassword('password123!');    // false（大文字なし）
validatePassword('PassWord!');       // false（数字なし）
validatePassword('Password1');       // false（特殊文字なし）
validatePassword('Pass1!');          // false（8 字未満）
```

**エラー**

| 条件 | エラーメッセージ |
|---|---|
| 文字列以外の型 | `Password must be a string` |

---

## 統合使用例

```js
const {
  validateEmail,
  validateUsername,
  validatePassword
} = require('./tools/validationTool');

// ユーザー登録フォーム検証
function validateRegistration(email, username, password) {
  const errors = [];

  if (!validateEmail(email)) {
    errors.push('Invalid email format');
  }

  if (!validateUsername(username)) {
    errors.push('Username must be 3-20 characters, letters/numbers/underscores only');
  }

  if (!validatePassword(password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

const result = validateRegistration('user@example.com', 'john_doe', 'SecurePass123!');
console.log(result); // { isValid: true, errors: [] }
```

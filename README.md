# dbx-js-sdk
> DBX Wallet h5 js sdk


## 使用方式
  - `script` 引入
    
    ```html
    <script src="path/to/dbx-js-sdk.js"></script>
    ```
    
  - nodejs 

    ```js
    const DBX = require('dbx-js-sdk');
    
    DBX.ready(function() {
      DBX.getAssets({
        success: function(assets) {
          console.log(assets);
        }
      });
    });
    ```

## API文档

### API列表

   API                                     | 说明
  :----------------------------------------|:-----------------------
  [DBX.back](#dbxback)                     | 后退
  [DBX.forward](#dbxforward)               | 前进
  [DBX.close](#dbxclose)                   | 关闭
  [DBX.reload](#dbxreload)                 | 重新加载
  [DBX.refresh](#dbxrefresh)               | 刷新
  [DBX.getFee](#dbxgetfeeobject)           | 获取手续费
  [DBX.getBalance](#dbxgetbalanceobject)   | 获取余额
  [DBX.getAssets](#dbxgetassetsobject)     | 获取当前钱包账户的资产列表
  [DBX.transaction](#dbxtransactionobject) | 发起交易

### DBX.back()
  
  后退。
  
  **参数说明**
	
  无参数
  
  **示例**
  
  ```js
  DBX.back();
  ```

### DBX.forward()
  
  前进。
  
  **参数说明**
	
  无参数
  
  **示例**
  
  ```js
  DBX.forward();
  ```

### DBX.close()
  
  关闭当前窗口。
  
  **参数说明**
	
  无参数
  
  **示例**
  
  ```js
  DBX.close();
  ```

### DBX.reload()
  
  重新加载。
  
  **参数说明**
	
  无参数
  
  **示例**
  
  ```js
  DBX.reload();
  ```

### DBX.refresh()
  
  刷新。
  
  **参数说明**
	
  无参数
  
  **示例**
  
  ```js
  DBX.refresh();
  ```

### DBX.getAssets(OBJECT)
  
  获取当前钱包账户的资产列表
  
  **OBJECT 参数说明**
	
  参数名   |  类型     | 必填 | 说明
  --------|----------|------|---------------------
  success | Function |  是  | 成功回调
  error   | Function |  否  | 失败回调(参数为错误提示)
  
  **示例**
  
  ```js
  DBX.getAssets({
    success: function(assets) {
      console.log(assets)
    }
  });
  ```

### DBX.getBalance(OBJECT)
  
  获取对应币种的余额
  
  **OBJECT 参数说明**
	
  参数名   |  类型     | 必填 | 说明
  --------|----------|------|---------------------
  assetId | String   |  是  | 币种ID
  success | Function |  是  | 成功回调
  error   | Function |  否  | 失败回调(参数为错误提示)
  
  **示例**
  
  ```js
  DBX.getBalance({
    assetId: '1.3.0',
    success: function(balance) {
      console.log(balance)
    }
  });
  ```

### DBX.getFee(OBJECT)
  
  获取手续费
  
  > 仅用于展示
  
  **OBJECT 参数说明**
	
  参数名   |  类型     | 必填 | 说明
  --------|----------|------|---------------------
  amount  | Number   |  是  | 金额
  assetId | String   |  是  | 币种ID
  success | Function |  是  | 成功回调
  error   | Function |  否  | 失败回调(参数为错误提示)
  
  **示例**
  
  ```js
  DBX.getFee({
    amount: 100,
    assetId: '1.3.0',
    success: function(fee) {
      console.log(fee)
    }
  });
  ```

### DBX.transaction(OBJECT)

  发起交易

  **OBJECT 参数说明**
	
  参数名   |  类型     | 必填 | 说明
  --------|----------|------|---------------------
  amount  | Number   |  是  | 交易金额
  assetId | String   |  是  | 币种ID
  target  | String   |  是  | 收款账户
  success | Function |  是  | 成功回调
  error   | Function |  否  | 失败回调(参数为错误提示)
  
  **示例**
  
  ```js
  DBX.transaction({
    amount: 100,
    assetId: '1.3.0',
    target: 'target',
    success: function(fee) {
      console.log(fee)
    }
  });
  ```

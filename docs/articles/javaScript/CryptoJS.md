# 加密


## vuex-persistedstate 中使用
```js
    import createPersistedState from 'vuex-persistedstate';
    import CryptoJS from 'crypto-js';

    // 创建一个vuex-persistedstate插件实例
    const persistedState = createPersistedState({
    // 将Vuex状态数据保存到localStorage中
    storage: window.localStorage,
    // 对Vuex状态数据进行加密
    setState: (key, state, storage) => {
        // 计算哈希值
        const hash = sha256(JSON.stringify(state));

        // 加密数据
        const encryptedState = CryptoJS.AES.encrypt(JSON.stringify(state), hash).toString();

        // 保存加密后的数据和哈希值到localStorage中
        storage.setItem(key, JSON.stringify({
            value: encryptedState,
            hash
        }));
    },
    // 对从localStorage中读取的数据进行解密和验证
    getState: (key, storage) => {
        // 从localStorage中读取数据
        const data = storage.getItem(key);

        if (data) {
        try {
            // 解析数据
            const { value, hash } = JSON.parse(data);

            // 计算哈希值
            const computedHash = sha256(CryptoJS.AES.decrypt(value, hash).toString(CryptoJS.enc.Utf8));

            // 比较哈希值
            if (hash === computedHash) {
            // 哈希值匹配，解密数据并返回
            return JSON.parse(CryptoJS.AES.decrypt(value, hash).toString(CryptoJS.enc.Utf8));
            } else {
            // 哈希值不匹配，数据可能被篡改，返回null
            return null;
            }
        } catch (error) {
            // 解析数据失败，返回null
            return null;
        }
        } else {
        // 数据不存在，返回null
        return null;
        }
    }
    });

    // 计算哈希值的函数
    function sha256(data) {
    // 使用CryptoJS库计算SHA256哈希值
    return CryptoJS.SHA256(data).toString();
    }

    // 导出vuex-persistedstate插件实例
    export default persistedState;

```


使用 Web Workers 
```js
    import createPersistedState from 'vuex-persistedstate';
    import CryptoJS from 'crypto-js';

    // 创建一个vuex-persistedstate插件实例
    const persistedState = createPersistedState({
    // 将Vuex状态数据保存到localStorage中
    storage: {
        getItem: (key) => {
        // 从localStorage中读取数据
        return localStorage.getItem(key);
        },
        setItem: (key, value) => {
        // 创建一个Web Worker来保存数据到localStorage中
        const worker = new Worker('/save-data-worker.js');

        // 向Web Worker发送消息
        worker.postMessage({
            key,
            value
        });

        // 监听Web Worker的消息
        worker.onmessage = (event) => {
            // 保存数据到localStorage中
            localStorage.setItem(key, event.data);
        };
        },
        removeItem: (key) => {
        // 从localStorage中删除数据
        localStorage.removeItem(key);
        }
    },
    // 对Vuex状态数据进行加密
    setState: (key, state, storage) => {
        // 计算哈希值
        const hash = sha256(JSON.stringify(state));

        // 加密数据
        const encryptedState = CryptoJS.AES.encrypt(JSON.stringify(state), hash).toString();

        // 保存加密后的数据和哈希值到localStorage中
        storage.setItem(key, JSON.stringify({
        value: encryptedState,
        hash
        }));
    },
    // 对从localStorage中读取的数据进行解密和验证
    getState: (key, storage) => {
        // 从localStorage中读取数据
        const data = storage.getItem(key);

        if (data) {
        try {
            // 解析数据
            const { value, hash } = JSON.parse(data);

            // 计算哈希值
            const computedHash = sha256(CryptoJS.AES.decrypt(value, hash).toString(CryptoJS.enc.Utf8));

            // 比较哈希值
            if (hash === computedHash) {
            // 哈希值匹配，解密数据并返回
            return JSON.parse(CryptoJS.AES.decrypt(value, hash).toString(CryptoJS.enc.Utf8));
            } else {
            // 哈希值不匹配，数据可能被篡改，返回null
            return null;
            }
        } catch (error) {
            // 解析数据失败，返回null
            return null;
        }
        } else {
        // 数据不存在，返回null
        return null;
        }
    }
    });

    // 计算哈希值的函数
    function sha256(data) {
    // 使用CryptoJS库计算SHA256哈希值
    return CryptoJS.SHA256(data).toString();
    }

    // 导出vuex-persistedstate插件实例
    export default persistedState;

```
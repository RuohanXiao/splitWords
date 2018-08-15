# ICT分词管理系统 —— 管理系统 #

----------


## 启动 #
> npm install

> npm start

## 文件说明 ##

**state：**
> store.js **deduce入口**
> 
> 
> reducer.js **里面存储的是初始化数据**

**src:**
>index.js **根节点**
>
>registerServiceWorker.js **里面存放的是正则** 

**src/components/form：**
> emotion **里面存放的是 标注任务组件**（标注组件包括标记以下种类的文本：分词标注，实体标注，词性标注，情感标注，分类标注）
> 
> CustomizedForm.js **弹出框组件**
> 
> Form.jsx **标注功能组件** 

>FormTable.js **标注列表组件**

----------

> tagging **里面存放的是 标注任务管理组件**（管理组件包括功能：导入文本，分发标注任务，删除标注文本，修改标注文本，导出文本，创建分类）
> 
> CustomizedForm.js **弹出框组件**
> 
> Form.jsx **标注功能组件** 

>FormTable.js **标注列表组件**

>ImportForm.js**导入文本弹框**（导入文本应为xml，导入后可以自动创建多个标注文本，相当于批量导入标注文本，但是，一个文本应该有对应ID，每个该文本下的标注文本都应该继承该ID，方便导出时对应导出）


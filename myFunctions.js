function changeQty(btn, change){
    // تغيير الكمية عند الضغط على + أو -

    let qtySpan = btn.parentElement.querySelector(".qty");
    // جلب عنصر الكمية داخل نفس الصف

    let qty = parseInt(qtySpan.innerText);
    // تحويل النص إلى رقم

    qty += change;
    // زيادة أو إنقاص الكمية

    if(qty < 0) qty = 0;
    // منع الكمية من أن تصبح سالبة

    qtySpan.innerText = qty;
    // عرض الكمية الجديدة
}


// كشف المحافظة من الرقم الوطني
function detectProvince(){

    let nid = document.getElementById("nid").value;
    // جلب الرقم الوطني

    let out = document.getElementById("province");
    // مكان عرض اسم المحافظة

    if(nid.length < 2){
        out.innerText = "";
        return;
        // إذا الرقم قصير جداً لا يتم التحليل
    }

    let code = nid.substring(0,2);
    // أخذ أول رقمين من الرقم الوطني

    let province = "";
    // متغير لتخزين اسم المحافظة

    switch(code){
        case "01": province="دمشق"; break;
        case "02": province="ريف دمشق"; break;
        case "03": province="القنيطرة"; break;
        case "04": province="درعا"; break;
        case "05": province="السويداء"; break;
        case "06": province="حمص"; break;
        case "07": province="حماة"; break;
        case "08": province="حلب"; break;
        case "09": province="إدلب"; break;
        case "10": province="اللاذقية"; break;
        case "11": province="طرطوس"; break;
        case "12": province="دير الزور"; break;
        case "13": province="الحسكة"; break;
        case "14": province="الرقة"; break;
        default: province="غير معروف";
        // تحديد المحافظة حسب الرقم
    }

    out.innerText = "📍 " + province;
    // عرض المحافظة للمستخدم
}


// 🔥 تحديد الشركة حسب الرقم (كان خارج أي دالة)
let operator = "";
// تعريف متغير الشركة

if(phone.startsWith("093") , phone.startsWith("099") , phone.startsWith("098")){
    operator = "Syriatel";
}
// إذا الرقم يبدأ بهذه القيم → Syriatel  

else if(phone.startsWith("094") , phone.startsWith("096") , phone.startsWith("095")){
    operator = "MTN";
}
// إذا يبدأ بهذه القيم → MTN 

else{
    operator = "غير معروف";
}
// غير معروف إذا لا ينطبق


// زر المتابعة
function showForm(){

    let ok = false;
    // متغير للتحقق من اختيار وجبة

    document.querySelectorAll(".qty").forEach(q=>{
        // المرور على كل الكميات

        if(parseInt(q.innerText) > 0){
            ok = true;
            // إذا في وجبة مختارة
        }
    });

    if(!ok){
        alert("❌ اختر وجبة");
        return;
        // منع المتابعة إذا لا يوجد اختيار
    }

    document.getElementById("formDiv").style.display = "block";
    // إظهار الفورم
}


// إظهار التفاصيل
function toggleDetails(id){

    let row = document.getElementById(id);
    // جلب الصف المطلوب

    if(row.style.display === "none"){
        row.style.display = "table-row";
        // إظهار الصف
    } else {
        row.style.display = "none";
        // إخفاء الصف
    }
}


// التحقق + الحساب + الرسالة النهائية
function validateForm(){

    let name = document.getElementById("name").value;
    // الاسم

    let nid = document.getElementById("nid").value;
    // الرقم الوطني

    let address = document.getElementById("address").value;
    // العنوان

    let provinceText = document.getElementById("province").innerText;
    // المحافظة

    let phone = document.getElementById("phone").value;
    // رقم الهاتف

    
    let date = document.getElementById("date").value;
    // جلب التاريخ (إضافة جديدة)

    let email = document.getElementById("email").value;
    // جلب الإيميل (إضافة جديدة)

   
//للاجبار
    if (name !== "" && !/^[\p{Script=Arabic}\s]+$/u.test(name)) {
    alert("❌ الاسم غير صحيح، يجب أن يكون بالعربية أو يترك فارغاً");
    return false;
}

     if(nid === ""){
        alert("❌ الرقم الوطني  مطلوب");
        return false;
    }
    if(!/^[0-9]{11}$/.test(nid)){
        alert("❌ الرقم الوطني يجب أن يكون 11 رقم");
        return false;
    }
    
   // if(address.trim() === ""){
     //   alert("❌  الموقع مطلوب");
    //    return false;
   // }

   // phone = phone.trim().replace(/\s/g, "");

   // if(phone === ""){
   //     alert("❌ رقم الموبايل مطلوب");
   //     return false;
//}

   // if(!/^[0-9]{10}$/.test(phone)){
   //     alert("❌ رقم الموبايل يجب أن يكون 10 أرقام ");
    //    return false;
   // }
    
   // if(date === ""){
    //    alert("❌التاريخ  مطلوب");
    //    return false;
        
   // }
   // if( email === ""){
    //    alert("❌  الإيميل مطلوب");
    //    return false;
        
   // }



    let total = 0;
    let selectedMeals = "";

    document.querySelectorAll("tr").forEach(row=>{

        let qty = row.querySelector(".qty");
        let priceEl = row.querySelector(".price");

        if(qty && priceEl){

            let qtyVal = parseInt(qty.innerText) || 0;
            let priceVal = parseInt(priceEl.innerText) || 0;

            if(qtyVal > 0){
                total += priceVal * qtyVal;

                selectedMeals += "- " + row.children[1].innerText +
                                 " x" + qtyVal + "\n";
            }
        }
    });

    let discount = total * 0.05;
    let finalTotal = total - discount;

    alert(
        "✅ تم الطلب بنجاح\n\n" +
        "👤 الاسم: " + name + "\n" +
          " الرقم الوطني: " + nid + "\n" +
        "📍 المحافظة: " + provinceText + "\n" +
        "🏠 الموقع: " + address + "\n\n" +
        "📞 الموبايل: " + phone + " غير معروف " + operator + "\n" +
        "📅 التاريخ: " + date + "\n" +   
        "📧 الإيميل: " + email + "\n" +   
        "🍽 الوجبات:\n" + selectedMeals + "\n" +
        "💰 المجموع قبل الخصم: " + total + "\n" +
        "🎁 الخصم (5%): " + discount + "\n" +
        "💵 المجموع بعد الخصم: " + finalTotal
    );

    location.reload();
    return false;
}

let multiSelectStyleTag14159 = document.createElement("style");
multiSelectStyleTag14159.innerHTML = `
    .multiselect-custom{
        max-height: 34px;
    }
    .multiselect-custom-openBtn{
        position: relative;
        text-align: right;
        overflow: hidden;
    }
    .multiselect-custom-box{
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .multiselect-custom-openBtn:after{
        cdisplay: inline-block;
        margin-left: .255em;
        vertical-align: .255em;
        content: "";
        border-top: .3em solid;
        border-right: .3em solid transparent;
        border-bottom: 0;
        border-left: .3em solid transparent;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
    }
    .multiselect-custom-list{
        max-height: 250px;
        overflow: auto;
        padding: 0;
        width: 100%;
    }
    .multiselect-custom-list-item{
        cursor: pointer;
        padding: 5px;
        border-bottom: 1px solid #ccc;
        user-select: none;
    }
    .multiselect-custom-list-item label{
        display: block;
        cursor: pointer;
    }
    .multiselect-custom-list-item.selected{
        background: #555;
        color: #fff;
        border-bottom: 1px solid #555;
    }
    
    .multiselect-custom-list-item:last-child{
        border-bottom: none;
    }
`;
document.getElementsByTagName('head')[0].appendChild(multiSelectStyleTag14159);
function multiSelectInit(){
    $("select.multiselect-custom:not(.multiSelectGenerated14159)").each(function () {
        $(this).attr("multiple","multiple");

        let placeholder = $(this).attr("data-placeholder");
        placeholder = placeholder?placeholder:"";
        let selectedList = $(this).attr("data-selected");
        selectedList = selectedList?selectedList.split("|||"):[];
        let dateNow = new Date().getTime();
        let boxId = "multiSelectCustomBox_"+dateNow+"_"+Math.floor(Math.random() * 10000000);
        let content = `
            <div class="dropdown multiselect-custom-box" id="`+boxId+`">
            <button class="btn btn-default dropdown-toggle form-control text-end multiselect-custom-openBtn justify-content-start" style=""  data-placeholder="`+placeholder+`" type="button" id="dropdownMenu1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">

            </button>
            <ul class="dropdown-menu multiselect-custom-list" aria-labelledby="dropdownMenu1" style=""">
        `;

        let name = $(this).attr("name").replace("[]","")+"[]";
        let id = $(this).attr("id")?$(this).attr("id"):"multiSelectCustomId_"+(new Date().getTime());
        let randNum = Math.floor(Math.random() * 10000000);
        let inputId =  "checkAll_" + id + randNum;
        if($(this).find("option").length){
            content += `
									<li class="multiselect-custom-list-item"><label for="`+inputId+`"><input id="`+inputId+`" class="customSelectCheckbox checkAll" type="checkbox"> انتخاب همه</label></li>
								`;
        }

        let counter = 0;
        $(this).find("option").each(function () {
            let selected = selectedList.includes($(this).attr("value"))?"selected":"";
            let checked = selectedList.includes($(this).attr("value"))?"checked":"";
            randNum = Math.floor(Math.random() * 10000000);
            inputId =  "item_" + id + randNum + counter;
            content += `
                        <li class="multiselect-custom-list-item `+selected+`"><label for="`+inputId+`"><input id="`+inputId+`" `+checked+` type="checkbox" class="customSelectCheckbox item" name="`+name+`" value="`+$(this).attr("value")+`"> `+$(this).text()+`</label></li>
                        `;
            counter++;
        });
        content += `</ul></div>`;
        $(this).css("display","none");
        $( content).insertAfter($(this));
        $(this).addClass("multiSelectGenerated14159");
        $(this).attr("name","");
        if($("#"+boxId).find(".customSelectCheckbox.item:checked").length === $("#"+boxId).find(".customSelectCheckbox.item").length){
            $("#"+boxId).find(".customSelectCheckbox.checkAll").prop("checked",true);
            $("#"+boxId).find(".customSelectCheckbox.checkAll").parents(".multiselect-custom-list-item").addClass("selected");
        }else {
            $("#"+boxId).find(".customSelectCheckbox.checkAll").prop("checked",false);
            $("#"+boxId).find(".customSelectCheckbox.checkAll").parents(".multiselect-custom-list-item").removeClass("selected");
        }
        showSelectedItems($("#"+boxId));
    });
}


$(document).ready(function () {
    if($("select.multiselect-custom").length){
        multiSelectInit()
    }

    $(".multiselect-custom-list").on("click",function (e) {
        e.stopPropagation();
    });
    $(".customSelectCheckbox").on("click",function (e) {
        e.stopPropagation();
    });
    $(".customSelectCheckbox").on("change",function () {
        let parent = $(this).parents(".multiselect-custom-box");
        let li = $(this).parents(".multiselect-custom-list-item");
        li.toggleClass("selected");
        if($(this).hasClass("checkAll")){
            if($(this).is(":checked")){
                parent.find(".customSelectCheckbox").prop("checked",true);
                $(".multiselect-custom-list-item").addClass("selected");
            }else{
                parent.find(".customSelectCheckbox").prop("checked",false);
                $(".multiselect-custom-list-item").removeClass("selected");
            }
        }else if($(this).hasClass("item")){
            if(parent.find(".customSelectCheckbox.item:checked").length === parent.find(".customSelectCheckbox.item").length){
                parent.find(".customSelectCheckbox.checkAll").prop("checked",true);
                parent.find(".customSelectCheckbox.checkAll").parents(".multiselect-custom-list-item").addClass("selected");
            }else {
                parent.find(".customSelectCheckbox.checkAll").prop("checked",false);
                parent.find(".customSelectCheckbox.checkAll").parents(".multiselect-custom-list-item").removeClass("selected");
            }
        }
        showSelectedItems(parent);
    });
});

function showSelectedItems(selectMultipleBox){

    let button = selectMultipleBox.find("button.btn.multiselect-custom-openBtn");
    let text = [];
    selectMultipleBox.find(".customSelectCheckbox:checked").each(function (){
        text.push($(this).parents("label").text().trim());
    });
    if(text.length){
        button.text(text.join(" || "));
    }else{
        let placeholder = button.attr("data-placeholder");
        placeholder = (placeholder !== undefined && placeholder?placeholder:"انتخاب کنید:");
        button.text(placeholder);
    }

}

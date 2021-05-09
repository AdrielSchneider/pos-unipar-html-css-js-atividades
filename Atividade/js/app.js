$(document).ready(function () {

    var id = 0;

    var formNoticias = $('#form-noticia');

    formNoticias.on('submit', function () {

        var json = getJson(formNoticias);

        addDataTable(json);

        return false;
    });

    function getJson(form) {
        var inputs = form.find('input[type="text"], textarea');
        var jsonReturn = "";
        inputs.each(function(idx, input){
            var name = $(input).attr("name");
            var value = $(input).val();
            if (jsonReturn !== "") 
                jsonReturn += ",";
            jsonReturn += `"${name}": "${value}"`;
        });
        jsonReturn = `{${jsonReturn}}`
        return JSON.parse(jsonReturn);

    };

    function addDataTable(json) {

        var tbody = $('#table-noticia tbody');
        var tr = $(`<tr id="remover-${id}"></tr>`);
        var tdTitulo = $('<td></td>');
        var tdIntro = $('<td></td>');
        var tdRemove = $('<td></td>');
        
        tdTitulo.text(json["titulo"]);
        tdIntro.text(json["intro"]);

        var remover = $("<a></a>");
        remover.text("Remover");
        remover.addClass("btn btn-sm btn-danger")
        tdRemove.append(remover);

        remover.on('click', function() {
            removeRow(tr);
        });

        tr.append(tdTitulo, tdIntro, tdRemove);
        tbody.append(tr);
        showRowCount();
    }

    function removeRow(tr) {
        tr.remove();
        showRowCount();
    }

    function showRowCount () {
        var total = $('#table-noticia tbody tr').length;

        $("#table-noticia tfoot tr td span").text(total);
    }

});
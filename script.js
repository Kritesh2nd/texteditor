var editorButtonBox = document.querySelector(".editorButtonBox");
var textareaBox = document.querySelector(".textareaBox");
var editorEditButtonBox = document.querySelector(".editorEditButtonBox");

var textareaCount = 5;
var addTextareaBtn, removeTextareaBtn;
var editorButtonArr = [],
  textareaArr = [];
var selectedEditor = 0;
var textareaDataArr = [];

var saveData = {
  textareaCount: textareaCount,
  textareaDataArr: textareaDataArr,
  selectedEditor: selectedEditor,
};

const setEditorButton = (id) => {
  const constId = id;
  editorButtonArr[id] = document.createElement("div");
  editorButtonArr[id].innerText = "Editor " + (id + 1);
  editorButtonArr[id].style.border = "1px solid #000";
  editorButtonArr[id].style.padding = "6px 20px";
  editorButtonArr[id].style.cursor = "pointer";
  editorButtonArr[id].style.borderRadius = "2px";
  editorButtonArr[id].addEventListener("click", () => {
    activeTextarea(constId);
  });
  editorButtonBox.appendChild(editorButtonArr[id]);
};

const setTextarea = (id) => {
  const constId = id;
  textareaArr[id] = document.createElement("textarea");
  textareaArr[id].style.border = "1px solid #000";
  textareaArr[id].style.padding = "10px";
  textareaArr[id].style.cursor = "pointer";
  textareaArr[id].style.display = "none";
  textareaArr[id].placeholder = "textarea " + (id + 1) + "...";
  textareaArr[id].value = textareaDataArr[id] ? textareaDataArr[id] : "";
  textareaArr[id].addEventListener("input", () => {
    textareaInput(constId);
  });
  textareaBox.appendChild(textareaArr[id]);
};

const activeTextarea = (id) => {
  for (var a = 0; a < textareaCount; a++) {
    editorButtonArr[a].style.background = "#fff";
    textareaArr[a].style.display = "none";
  }
  textareaArr[id].style.display = "block";
  editorButtonArr[id].style.background = "#ccc";
  selectedEditor = id;
  saveDataInLocalStorage();
};
const addNewTextarea = () => {
  addTextareaBtn = document.createElement("div");
  addTextareaBtn.innerText = "Add Text Editor";
  addTextareaBtn.style.border = "1px solid #000";
  addTextareaBtn.style.padding = "6px 20px";
  addTextareaBtn.style.cursor = "pointer";
  addTextareaBtn.style.borderRadius = "2px";
  addTextareaBtn.addEventListener("click", () => {
    setEditorButton(textareaCount);
    setTextarea(textareaCount);
    textareaCount++;
    saveDataInLocalStorage();
  });
  editorEditButtonBox.appendChild(addTextareaBtn);
};
const removeNewTextarea = () => {
  addTextareaBtn = document.createElement("div");
  addTextareaBtn.innerText = "Remove Text Editor";
  addTextareaBtn.style.border = "1px solid #000";
  addTextareaBtn.style.padding = "6px 20px";
  addTextareaBtn.style.cursor = "pointer";
  addTextareaBtn.style.borderRadius = "2px";
  addTextareaBtn.addEventListener("click", () => {
    const updatedEditorButtonArr = editorButtonArr.filter(
      (item, index) => index != textareaCount - 1
    );
    editorButtonArr = updatedEditorButtonArr;

    const updatedTextareaArr = textareaArr.filter(
      (item, index) => index != textareaCount - 1
    );
    textareaArr = updatedTextareaArr;
    textareaCount--;
    saveDataInLocalStorage();
    console.log(editorButtonArr, textareaArr);
  });
  editorEditButtonBox.appendChild(addTextareaBtn);
};

const handelTextarea = () => {
  // editorButtonBox
  loadLocalStorage();
  for (var a = 0; a < textareaCount; a++) {
    setEditorButton(a);
    setTextarea(a);
  }
  addNewTextarea();
  removeNewTextarea();
  activeTextarea(selectedEditor);
};

const textareaInput = (id) => {
  var data = textareaArr[id].value;

  textareaDataArr[id] = data;
  saveDataInLocalStorage();
};

const saveDataInLocalStorage = () => {
  saveData = {
    textareaCount: textareaCount,
    textareaDataArr: textareaDataArr,
    selectedEditor: selectedEditor,
  };

  localStorage.setItem("saveData", JSON.stringify(saveData));
};

const loadLocalStorage = () => {
  const saveData = localStorage.getItem("saveData");
  if (saveData) {
    const savedDataTemp = JSON.parse(saveData);
    textareaCount = savedDataTemp.textareaCount;
    textareaDataArr = savedDataTemp.textareaDataArr;
    selectedEditor = savedDataTemp.selectedEditor
      ? savedDataTemp.selectedEditor
      : 0;
  }
};

handelTextarea();

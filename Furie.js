//Чтобы вычислить расстояние, нужно в функцию MainCalculation(ar1, ar2) передать 2 одномерных массива с данными экселелометра
//Пример:
//rasstoyanie = MainCalculation([1,2,3,4,5], [6,7,8,9,10])
export function FurieTransform(mas) {
	var i;

	N = mas.length;
 
 
	var a = 1/Math.sqrt(N);
	var fjRe=[],fjIm=[],fjAm=[],j;
	for(j=0;j<N;j++)
	{
		var sumre = 0,sumim = 0,k;
		for(k=0;k<N;k++)
		{
			sumre += mas[k]*Math.cos(2*Math.PI/N*k*j);  
			sumim += mas[k]*Math.sin(2*Math.PI/N*k*j);
		}
		fjRe[j] = a*sumre;
		fjIm[j] = -a*sumim;
		fjAm[j] = Math.sqrt(fjRe[j]*fjRe[j]+fjIm[j]*fjIm[j]);
	
	}
	return fjAm.slice(0, Math.round(N/2));
}
export function pickPeaks(array) {
  return array.reduce((res, curr, i, arr) => {
    if(arr[i-1] < 1.5*curr && curr > 1.5*arr[i+1] && curr>0.5) {
      res["pos"] = res["pos"] ? res["pos"].concat([i]) : [i];
      res["peaks"] = res["peaks"] ? res["peaks"].concat([curr]) : [curr];
    } 
    return res;
  },{});
}
export function Dist(array1, array2, N1, N2) {
	if (array1.length === 0 || array2.length === 0) {
		return 0
	}
	if(array1.length > array2.length) {
		for(var i = array2.length; i < array1.length; i++) {
			array2[i]=0;
		}
	}
	if(array2.length > array1.length) {
		for(var i = array1.length; i < array2.length; i++) {
			array1[i]=0;
		}
	}
	var r = 0;
	for(var i = 0; i < array1.length; i++) {
		r = r + (array2[i]-array1[i])*(array2[i]-array1[i]);
	}
	
	//новый метод подсчета расстояния
	r1 = 0;
	r2 = 0;
	for(var i = 0; i < array1.length; i++) {
		if(r1<N1/25*5) r1 = r1 + array1[i];
	}
	for(var i = 0; i < array2.length; i++) {
		if(r2<N2/25*5) r2 = r2 + array2[i];
	}
	return Math.sqrt((r1-r2)*(r1-r2));
}
export function MainCalculation(ar1, ar2) {
	//находим фурье спектры
	F1 = FurieTransform(ar1);
	F2 = FurieTransform(ar2);
	console.log('furie 1')
	console.log(F1)
	console.log('furie 2')
	console.log(F2)
	
	//Находим пики в спектрах
	P1 = pickPeaks(F1);
	P2 = pickPeaks(F2);
	console.log('peaks 1')
	console.log(P1)
	console.log('peaks 2')
	console.log(P2)
	
	N1 = F1.length;
	N2 = F2.length;
	//находим разницу между пиками
	var dist = Dist(P1.pos, P2.pos, N1, N2);
	console.log('dist')
	console.log(dist)
	return dist;
}

export function extend (src: {}, dest: {}): {}
{
	for (let d in dest)
	{
		if (dest.hasOwnProperty(d))
			src[d] = dest[d];
	}
	return (src);
}

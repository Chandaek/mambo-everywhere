export const config = {
	interactiveElement: {
		button: {
			label: "Buttons",
			selector: "button",
		},
		link: {
			label: "Links",
			selector: "a[href]",
		},
		area: {
			label: "Image map links",
			selector: "area[href]",
		},
		input: {
			label: "Input fields",
			selector: "input:not([type='hidden'])",
		},
		select: {
			label: "Select menus",
			selector: "select",
		},
		textarea: {
			label: "Text areas",
			selector: "textarea",
		},
		summary: {
			label: "Disclosure controls",
			selector: "summary",
		},
		label: {
			label: "Labels",
			selector: "label",
		},
		roleButton: {
			label: "Role: Button",
			selector: "[role='button']",
		},
		roleLink: {
			label: "Role: Link",
			selector: "[role='link']",
		},
		roleCheckbox: {
			label: "Role: Checkbox",
			selector: "[role='checkbox']",
		},
		roleRadio: {
			label: "Role: Radio",
			selector: "[role='radio']",
		},
		roleSwitch: {
			label: "Role: Switch",
			selector: "[role='switch']",
		},
		roleTab: {
			label: "Role: Tab",
			selector: "[role='tab']",
		},
		roleMenuitem: {
			label: "Role: Menu item",
			selector: "[role='menuitem']",
		},
		roleMenuitemcheckbox: {
			label: "Role: Menu item checkbox",
			selector: "[role='menuitemcheckbox']",
		},
		roleMenuitemradio: {
			label: "Role: Menu item radio",
			selector: "[role='menuitemradio']",
		},
		roleOption: {
			label: "Role: Option",
			selector: "[role='option']",
		},
		roleTreeitem: {
			label: "Role: Tree item",
			selector: "[role='treeitem']",
		},
		roleSlider: {
			label: "Role: Slider",
			selector: "[role='slider']",
		},
		roleSpinbutton: {
			label: "Role: Spin button",
			selector: "[role='spinbutton']",
		},
		roleCombobox: {
			label: "Role: Combo box",
			selector: "[role='combobox']",
		},
		roleListbox: {
			label: "Role: List box",
			selector: "[role='listbox']",
		},
		onclick: {
			label: "Custom onclick elements",
			selector: "[onclick]",
		},
	},
} as const;
